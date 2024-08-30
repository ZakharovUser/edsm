import { httpClient } from 'utils/axios';

export async function approveTask(taskId: number | string) {
  return httpClient.post(`api/edm/task/${taskId}/accept/`);
}
