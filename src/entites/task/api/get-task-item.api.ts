import { httpClient } from 'utils/axios';

import { Task } from '../model';

export async function getTaskItem(id: string) {
  return httpClient.get<Task>(`/api/edm/task/${id}`).then((res) => res.data);
}
