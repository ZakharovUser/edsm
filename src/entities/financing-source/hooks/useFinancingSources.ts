import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import getFinancingSources from 'entities/financing-source/api';
import { FinancingSourceModel } from 'entities/financing-source/models';

interface Error {
  detail: string;
}

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
