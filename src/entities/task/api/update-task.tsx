import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/http-client';

import { Task } from 'entities/task/model';

import endpoints from 'shared/api/endpoints';

// -----------------------------------------------------------------------------------------------------------------

type Params = {
  taskId: number | string;
  body: Partial<Task>;
};

export async function updateTask({ taskId, body }: Params) {
  const url = urlcat(endpoints.task.item, { task: taskId });

  return httpClient.patch(url, body);
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', `${params.taskId}`] });
    },
  });
}
