import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { TaskRoutes } from 'entities/task/model';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

// -----------------------------------------------------------------------------------------------------------------

interface Response {
  rows: TaskRoutes;
}

export async function getTaskRoutes() {
  return httpClient.get<Response>(endpoints.route.list).then((res) => res.data.rows);
}

export function useTaskRoutes<TData = TaskRoutes>(
  options?: Omit<UseQueryOptions<TaskRoutes, Error, TData>, 'queryFn' | 'queryKey'>
) {
  return useQuery<TaskRoutes, Error, TData>({
    queryKey: ['task-routes'],
    queryFn: getTaskRoutes,
    ...options,
  });
}
