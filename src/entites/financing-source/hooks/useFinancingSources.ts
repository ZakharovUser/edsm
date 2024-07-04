import { useQuery } from '@tanstack/react-query';

import getFinancingSources from 'entites/financing-source/api';

export function useFinancingSources() {
  return useQuery({
    queryKey: ['financing-sources'],
    queryFn: getFinancingSources,
  });
}
