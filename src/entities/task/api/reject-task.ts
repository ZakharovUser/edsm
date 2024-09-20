import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/axios';

interface Params {
  taskId: number | string;
  message?: string;
}

export async function rejectTask({ taskId, message }: Params) {
  return httpClient.post(`/api/edm/task/${taskId}/back_previous_stage/ `, message && { message });
}

export function useRejectTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectTask,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', params.taskId] });
    },
  });
}
