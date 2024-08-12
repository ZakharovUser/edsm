import { useQuery } from '@tanstack/react-query';

import { getOutboxItem } from '../api';

export function useGetOutboxItem(id: string | null) {
  return useQuery({
    queryKey: ['outbox', id],
    queryFn: ({ queryKey }) => getOutboxItem(queryKey[1]),
    enabled: !!id,
  });
}
