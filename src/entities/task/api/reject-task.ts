import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

interface Params {
  taskId: number | string;
  message?: string;
}

export async function rejectTask({ taskId, message }: Params) {
  const url = urlcat(endpoints.task.actions.reject, { task: taskId });

  return httpClient.post(url, message && { message });
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
