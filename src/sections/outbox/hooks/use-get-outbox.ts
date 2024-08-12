import { useQuery } from '@tanstack/react-query';

import { getOutbox } from '../api';

export function useGetOutbox() {
  return useQuery({
    queryKey: ['outbox'],
    queryFn: getOutbox,
  });
}
