import { type Model } from '../backend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEnrollment } from '../hooks/useEnrollment';
import { useEnrollmentStatus } from '../hooks/useEnrollmentStatus';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { CheckCircle2, Loader2, User } from 'lucide-react';
import { toast } from 'sonner';

interface CourseCardProps {
  course: Model;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: isEnrolled, isLoading: statusLoading } = useEnrollmentStatus(course.courseId);
  const { mutate: enroll, isPending: isEnrolling } = useEnrollment();

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.error('Please login to enroll in courses');
      return;
    }

    enroll(course.courseId, {
      onSuccess: () => {
        toast.success(`Successfully enrolled in ${course.title}!`);
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to enroll in course');
      },
    });
  };

  const buttonDisabled = !isAuthenticated || isEnrolled || isEnrolling || statusLoading;
  const buttonText = isEnrolling
    ? 'Enrolling...'
    : isEnrolled
    ? 'Enrolled'
    : !isAuthenticated
    ? 'Login to Enroll'
    : 'Enroll Now';

  return (
    <div className="group rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/assets/generated/course-icon.dim_128x128.png"
              alt="Course icon"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{course.instructor}</span>
          </div>
        </div>

        {isEnrolled && (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Enrolled
          </Badge>
        )}

        <Button onClick={handleEnroll} disabled={buttonDisabled} className="w-full" size="lg">
          {isEnrolling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
