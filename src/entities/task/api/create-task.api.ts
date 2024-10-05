import { httpClient } from 'utils/http-client';

export async function createTask(values: unknown) {
  return httpClient.post('/api/edm/task/', values);
}
