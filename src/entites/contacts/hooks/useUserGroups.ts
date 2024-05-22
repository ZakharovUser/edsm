import { useQuery } from '@tanstack/react-query';

import getUserGroups from '../api/getUserGroups';

export function useUserGroups() {
  return useQuery({
    queryKey: ['user-groups'],
    queryFn: getUserGroups,
  });
}
