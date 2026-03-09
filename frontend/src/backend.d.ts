import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Id = bigint;
export type Instructor = string;
export interface Model {
    title: Title;
    instructor: Instructor;
    courseId: Id;
}
export interface UserProfile {
    name: string;
}
export type Title = string;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCourse(title: string, instructor: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCourse(courseId: Id): Promise<void>;
    enroll(courseId: Id): Promise<void>;
    getAvailableCourses(): Promise<Array<Model>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCoursesByInstructor(instructor: string): Promise<Array<Model>>;
    getCoursesForUser(user: Principal): Promise<Array<Model>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isUserEnrolled(courseId: Id): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
