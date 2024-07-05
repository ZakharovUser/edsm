import { useQuery } from '@tanstack/react-query';

import { getOutbox } from 'sections/outbox/api';

export function useGetOutbox() {
  return useQuery({
    queryKey: ['outbox'],
    queryFn: getOutbox,
  });
}
