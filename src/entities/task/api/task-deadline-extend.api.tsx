import { useMutation } from '@tanstack/react-query';

import { endpoints, httpClient } from 'utils/http-client';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDeadlineExtendValues {
  message: string;
  new_deadline_date: Date | string;
}

export interface TaskDeadlineExtendParams {
  taskId: number | string | undefined;
  body: TaskDeadlineExtendValues;
}

export async function taskDeadlineExtend({ taskId, body }: TaskDeadlineExtendParams) {
  if (!taskId) {
    throw new Error('taskId is not defined');
  }

  return httpClient.post(endpoints.task.extendDeadline(taskId), body);
}

export function useTaskDeadlineExtend() {
  return useMutation({
    mutationFn: taskDeadlineExtend,
  });
}
