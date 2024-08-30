import { useMutation } from '@tanstack/react-query';

import { httpClient } from 'utils/axios';

interface Body {
  executor_id?: number;
  supervisor_id?: number;
}

export async function acceptTask(taskId: number | string, body?: Body) {
  return httpClient.post(`/api/edm/task/${taskId}/set_executor/`, body);
}

export function useAcceptTask() {
  return useMutation({
    mutationFn: (params: Parameters<typeof acceptTask>) => acceptTask(...params),
  });
}
