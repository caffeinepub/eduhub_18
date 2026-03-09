import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module Course {
    public type Id = Nat;
    public type Title = Text;
    public type Instructor = Text;

    public type Model = {
      courseId : Id;
      title : Title;
      instructor : Instructor;
    };

    public func compareByInstructor(a : Model, b : Model) : Order.Order {
      Text.compare(a.instructor, b.instructor);
    };
  };

  let courses = Map.empty<Course.Id, Course.Model>();
  let enrollments = Map.empty<Course.Id, Set.Set<Principal>>();
  var nextCourseId : Course.Id = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public type CourseInfo = {
    course : Course.Model;
    isEnrolled : Bool;
  };

  public shared ({ caller }) func enroll(courseId : Course.Id) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Must be logged in to enroll");
    };

    switch (courses.get(courseId)) {
      case (null) { Runtime.trap("Course does not exist") };
      case (?_) {
        let courseEnrollments = switch (enrollments.get(courseId)) {
          case (null) {
            let newSet = Set.empty<Principal>();
            enrollments.add(courseId, newSet);
            newSet;
          };
          case (?existingSet) { existingSet };
        };
        if (courseEnrollments.contains(caller)) {
          Runtime.trap("Already enrolled in this course");
        } else {
          courseEnrollments.add(caller);
        };
      };
    };
  };

  public query ({ caller }) func getCoursesByInstructor(instructor : Text) : async [Course.Model] {
    let filteredCourses = courses.values().toArray().filter(
      func(course) { Text.equal(course.instructor, instructor) }
    );
    filteredCourses.sort(Course.compareByInstructor);
  };

  public query ({ caller }) func getCoursesForUser(user : Principal) : async [Course.Model] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own enrollments");
    };

    courses.values().toArray().filter(
      func(course) {
        switch (enrollments.get(course.courseId)) {
          case (null) { false };
          case (?enrolledSet) { enrolledSet.contains(user) };
        };
      }
    );
  };

  public query ({ caller }) func getAvailableCourses() : async [Course.Model] {
    courses.values().toArray();
  };

  public shared ({ caller }) func addCourse(title : Text, instructor : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add new courses");
    };

    let course : Course.Model = {
      courseId = nextCourseId;
      title;
      instructor;
    };
    courses.add(nextCourseId, course);
    nextCourseId += 1;
  };

  public shared ({ caller }) func deleteCourse(courseId : Course.Id) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete courses");
    };

    switch (courses.get(courseId)) {
      case (null) { Runtime.trap("Course does not exist") };
      case (_) {
        courses.remove(courseId);
        enrollments.remove(courseId);
      };
    };
  };

  public query ({ caller }) func isUserEnrolled(courseId : Course.Id) : async Bool {
    switch (enrollments.get(courseId)) {
      case (null) { false };
      case (?enrolledSet) { enrolledSet.contains(caller) };
    };
  };
};
