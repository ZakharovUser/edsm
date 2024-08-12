import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import getFinancingSources from 'entites/financing-source/api';
import { FinancingSourceModel } from 'entites/financing-source/models';

export function useFinancingSources<TData = FinancingSourceModel[]>(
  options: Pick<
    UseQueryOptions<FinancingSourceModel[], Error, TData | undefined>,
    'select' | 'enabled'
  > = {}
) {
  return useQuery<FinancingSourceModel[], Error, TData | undefined>({
    queryKey: ['financing-sources'],
    queryFn: getFinancingSources,
    ...options,
  });
}
