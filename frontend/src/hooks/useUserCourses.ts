import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { Model } from '../backend';

export function useUserCourses() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Model[]>({
    queryKey: ['userCourses'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const principal = identity.getPrincipal();
      return actor.getCoursesForUser(principal);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}
