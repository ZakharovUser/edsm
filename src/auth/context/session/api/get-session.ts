import { httpClient } from 'utils/http-client';

export async function getSession() {
  return httpClient.get('/api/edm/session/').then(({ data }) => data);
}
