import { httpClient } from 'utils/axios';

import { Task } from 'entites/task/model';

interface Response {
  rows: Array<Task>;
}

export async function getInbox() {
  return httpClient.get<Response>('/api/edm/task/inbox/').then((res) => res.data.rows);
}
