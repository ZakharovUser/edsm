import { useMutation, useQueryClient } from '@tanstack/react-query';

import { endpoints, httpClient } from 'utils/http-client';

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

  return httpClient.post(endpoints.task.extendDeadline(taskId), values);
}

export function useTaskDeadlineExtend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskDeadlineExtend,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', params.taskId] });
    },
  });
}
