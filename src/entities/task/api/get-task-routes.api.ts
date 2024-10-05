import { httpClient } from 'utils/http-client';

import { TaskRoute, TaskRoutes } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

interface Response {
  rows: TaskRoutes;
}

export type RoutesMap = Record<TaskRoute['id'], TaskRoute['name']>;

export async function getTaskRoutesApi(): Promise<RoutesMap> {
  return httpClient.get<Response>('/api/edm/document_route/').then((res) => {
    const routesMap = res.data.rows.reduce(
      (map, route) => map.set(route.id, route.name),
      new Map<number, string>()
    );

    return Object.fromEntries(routesMap.entries());
  });
}
