import { useUserCourses } from '../hooks/useUserCourses';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import CourseCard from './CourseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function MyCoursesPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: courses, isLoading } = useUserCourses();

  if (!isAuthenticated) {
    return (
      <div className="container py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Lock className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">Login Required</h2>
          <p className="text-muted-foreground">Please login to view your enrolled courses and track your progress.</p>
          <Button onClick={login} disabled={loginStatus === 'logging-in'} size="lg">
            {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Courses</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-border/50 p-6 space-y-4">
              <Skeleton className="h-32 w-32 rounded-xl mx-auto" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="container py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">No Enrolled Courses</h2>
          <p className="text-muted-foreground">
            You haven't enrolled in any courses yet. Browse our course catalog to get started!
          </p>
          <Link to="/courses">
            <Button size="lg">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Courses</h1>
        <p className="text-lg text-muted-foreground">
          You're enrolled in {courses.length} course{courses.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.courseId.toString()} course={course} />
        ))}
      </div>
    </div>
  );
}
