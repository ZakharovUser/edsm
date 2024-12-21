import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

import { TaskDeadlineExtendValues } from '../model';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDeadlineExtendParams {
  taskId: number | string | undefined;
  values: TaskDeadlineExtendValues;
}

export async function taskDeadlineExtend({ taskId, values }: TaskDeadlineExtendParams) {
  if (!taskId) {
    throw new Error('taskId is not defined');
  }

  const url = urlcat(endpoints.task.deadline.extend, { task: taskId });

  return httpClient.post(url, values);
}

export function useTaskDeadlineExtend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskDeadlineExtend,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', params.taskId?.toString()] });
    },
  });
}
