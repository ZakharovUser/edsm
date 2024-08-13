import { httpClient } from 'utils/axios';

import { TaskRoute, TaskRoutes } from 'entites/task/model';

// -----------------------------------------------------------------------------------------------------------------

interface Response {
  rows: TaskRoutes;
}

export type ReturnType = Record<TaskRoute['id'], TaskRoute['name']>;

export async function getTaskRoutesApi(): Promise<ReturnType> {
  return httpClient.get<Response>('/api/edm/document_route/').then((res) => {
    const routesMap = res.data.rows.reduce(
      (map, route) => map.set(route.id, route.name),
      new Map<number, string>()
    );

    return Object.fromEntries(routesMap.entries());
  });
}
