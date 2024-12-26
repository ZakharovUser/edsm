import { useMutation, useQueryClient } from '@tanstack/react-query';

import { InstituteModel } from 'entities/institute/model';
import { TaskBase, TaskRoute } from 'entities/task/model';
import { AttachmentModel } from 'entities/attachments/model';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

// -----------------------------------------------------------------------------------------------------------------

export interface CreateTaskRequest extends TaskBase {
  route: TaskRoute['id'];
  org_name: InstituteModel['id'];
  documents?: AttachmentModel[];
}

export async function createTask(values: CreateTaskRequest) {
  return httpClient.post(endpoints.task.list, values);
}

export function useCreateTaskQuery() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => client.invalidateQueries({ queryKey: ['outbox'] }),
  });
}
