import { httpClient } from 'utils/axios';

export async function getSession() {
  return httpClient.get('/api/edm/session/').then(({ data }) => data);
}
