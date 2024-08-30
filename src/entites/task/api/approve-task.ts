import { useMutation } from '@tanstack/react-query';

import { httpClient } from 'utils/axios';

interface Body {
  message: string;
}

export async function approveTask(taskId: number | string, body?: Body) {
  return httpClient.post(`api/edm/task/${taskId}/accept/`, body);
}

export function useApproveTask() {
  return useMutation({
    mutationFn: (params: Parameters<typeof approveTask>) => approveTask(...params),
  });
}
