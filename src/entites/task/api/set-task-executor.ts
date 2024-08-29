import { httpClient } from 'utils/axios';

interface Body {
  executor_id?: number;
  supervisor_id?: number;
}

export async function setTaskExecutor(taskId: number | string, body?: Body) {
  return httpClient.post(`/api/edm/task/${taskId}/set_executor/`, body);
}
