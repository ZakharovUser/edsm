import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDeadlineDeleteParams {
  taskId: string;
  requestId: string;
}

export async function taskDeadlineDelete({ taskId, requestId }: TaskDeadlineDeleteParams) {
  const url = urlcat(endpoints.task.deadline.delete, { task: taskId, deadline: requestId });

  return httpClient.delete(url);
}

export function useTaskDeadlineDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskDeadlineDelete,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', params.taskId] });
    },
  });
}
