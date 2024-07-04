import { httpClient } from 'utils/axios';

export async function createTask(values: unknown) {
  return httpClient.post('/api/edm/task/', values);
}
