import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Id } from '../backend';

export function useEnrollment() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: Id) => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('Must be logged in to enroll');
      return actor.enroll(courseId);
    },
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['enrollmentStatus', courseId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['userCourses'] });
    },
  });
}
