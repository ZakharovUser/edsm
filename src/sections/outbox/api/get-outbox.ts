import { httpClient } from 'utils/http-client';

import { Task } from 'entities/task/model';

interface Response {
  rows: Array<Task>;
}

export async function getOutbox() {
  return httpClient.get<Response>('/api/edm/task/outbox/').then((res) => res.data.rows);
}
