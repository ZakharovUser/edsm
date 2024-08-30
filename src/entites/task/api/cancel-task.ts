import { useMutation } from '@tanstack/react-query';

import { httpClient } from 'utils/axios';

export async function cancelTask(taskId: number | string) {
  return httpClient.post(`/api/edm/task/${taskId}/cancel/`);
}

export function useCancelTask() {
  return useMutation({
    mutationFn: (params: Parameters<typeof cancelTask>) => cancelTask(...params),
  });
}
