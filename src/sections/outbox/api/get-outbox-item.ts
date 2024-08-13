import { httpClient } from 'utils/axios';

import { Task } from 'entites/task/model';

export async function getOutboxItem(id: string | null) {
  return httpClient.get<Task>(`/api/edm/task/${id}`).then((res) => res.data);
}
