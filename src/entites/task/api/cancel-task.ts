import { httpClient } from 'utils/axios';

export async function cancelTask(taskId: number | string) {
  return httpClient.get(`/api/edm/task/${taskId}/cancel/`);
}
