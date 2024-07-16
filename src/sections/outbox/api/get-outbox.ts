import { httpClient } from 'utils/axios';

import { Task } from 'shared/task/model';

interface Response {
  rows: Array<Task>;
}

export async function getOutbox() {
  return httpClient.get<Response>('/api/edm/task/').then((res) => res.data.rows);
}