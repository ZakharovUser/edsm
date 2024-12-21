import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDeadlineRejectParams {
  taskId: string;
  requestId: string;
}

export async function taskDeadlineReject({ taskId, requestId }: TaskDeadlineRejectParams) {
  const url = urlcat(endpoints.task.deadline.reject, { task: taskId });

  return httpClient.post(url, { extension_request_id: requestId });
}

export function useTaskDeadlineReject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskDeadlineReject,
    onSuccess: async (_, params) => {
      await queryClient.invalidateQueries({ queryKey: ['task', params.taskId] });
    },
  });
}
