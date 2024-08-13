import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { type ReturnType, getTaskRoutesApi } from 'entites/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Options<TData> = Omit<UseQueryOptions<ReturnType, Error, TData>, 'queryFn' | 'queryKey'>;

export function useTaskRoutesQuery<TData = ReturnType>(options?: Options<TData>) {
  return useQuery<ReturnType, Error, TData>({
    queryKey: ['task-routes'],
    queryFn: getTaskRoutesApi,
    ...options,
  });
}
