import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/axios';

interface Params {
  taskId: number | string;
  message?: string;
}

export async function cancelTask({ taskId, message }: Params) {
  return httpClient.post(`/api/edm/task/${taskId}/cancel/`, message && { message });
}

export function useCancelTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelTask,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', params.taskId] });
    },
  });
}
