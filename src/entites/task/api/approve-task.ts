import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/axios';

interface Params {
  taskId: number | string;
  message?: string;
}

export async function approveTask({ taskId, message }: Params) {
  return httpClient.post(`api/edm/task/${taskId}/accept/`, message && { message });
}

export function useApproveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveTask,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', params.taskId] });
    },
  });
}
