import { httpClient } from 'utils/axios';

export async function cancelTask(taskId: number | string) {
  return httpClient.post(`/api/edm/task/${taskId}/cancel/`);
}
