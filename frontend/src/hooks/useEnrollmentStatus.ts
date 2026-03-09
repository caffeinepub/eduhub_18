import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Id } from '../backend';

export function useEnrollmentStatus(courseId: Id) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['enrollmentStatus', courseId.toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isUserEnrolled(courseId);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}
