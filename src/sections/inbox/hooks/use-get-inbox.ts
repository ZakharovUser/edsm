import { useQuery } from '@tanstack/react-query';

import { getInbox } from 'sections/inbox/api';

export function useGetInbox() {
  return useQuery({
    queryKey: ['inbox'],
    queryFn: getInbox,
  });
}
