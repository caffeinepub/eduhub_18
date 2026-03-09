import { useGetAvailableCourses } from '../hooks/useQueries';
import CourseCard from './CourseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';

export default function CourseList() {
  const { data: courses, isLoading } = useGetAvailableCourses();

  if (isLoading) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Available Courses</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
          <h2 className="text-2xl font-bold">No Courses Available</h2>
          <p className="text-muted-foreground">
            Check back soon! New courses are being added regularly to help you learn and grow.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Available Courses</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of {courses.length} course{courses.length !== 1 ? 's' : ''} and start learning today
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
