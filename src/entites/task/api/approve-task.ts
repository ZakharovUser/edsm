import { httpClient } from 'utils/axios';

export async function approveTask(taskId: number | string) {
  return httpClient.get(`api/edm/task/${taskId}/accept/`);
}
