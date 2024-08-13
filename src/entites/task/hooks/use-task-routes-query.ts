import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type RoutesMap, getTaskRoutesApi } from 'entites/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Options<TData> = Omit<UseQueryOptions<RoutesMap, Error, TData>, 'queryFn' | 'queryKey'>;

export function useTaskRoutesQuery<TData = RoutesMap>(options?: Options<TData>) {
  return useQuery<RoutesMap, Error, TData>({
    queryKey: ['task-routes'],
    queryFn: getTaskRoutesApi,
    ...options,
  });
}
