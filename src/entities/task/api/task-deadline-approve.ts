import urlcat from 'urlcat';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';
import { HttpClientError } from 'shared/api/types';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDeadlineApproveParams {
  taskId: string;
  requestId: string;
}

export async function taskDeadlineApprove({ taskId, requestId }: TaskDeadlineApproveParams) {
  const url = urlcat(endpoints.task.deadline.approve, { task: taskId });

  return httpClient.post(url, { extension_request_id: requestId });
}

export function useTaskDeadlineApprove() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, HttpClientError, TaskDeadlineApproveParams>({
    mutationFn: taskDeadlineApprove,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', params.taskId] });
    },
  });
}
