import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/http-client';

interface Params {
  taskId: number | string;
  executor_id?: number;
  supervisor_id?: number;
}

export async function acceptTask({ taskId, executor_id, supervisor_id }: Params) {
  return httpClient.post(`/api/edm/task/${taskId}/set_executor/`, { executor_id, supervisor_id });
}

export function useAcceptTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptTask,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', params.taskId] });
    },
  });
}
