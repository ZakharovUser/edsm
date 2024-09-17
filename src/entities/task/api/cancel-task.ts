import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/axios';

interface Params {
  taskId: number | string;
}

export async function cancelTask({ taskId }: Params) {
  return httpClient.post(`/api/edm/task/${taskId}/cancel/`);
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
