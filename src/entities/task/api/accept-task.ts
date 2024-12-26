import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

interface Params {
  taskId: number | string;
  executor_id?: number;
  supervisor_id?: number;
}

export async function acceptTask({ taskId, executor_id, supervisor_id }: Params) {
  const url = urlcat(endpoints.task.actions.accept, { task: taskId });

  return httpClient.post(url, { executor_id, supervisor_id });
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
