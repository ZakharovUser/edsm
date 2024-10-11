import { useMutation, useQueryClient } from '@tanstack/react-query';

import { endpoints, httpClient } from 'utils/http-client';

import { Task } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

type Params = {
  taskId: number | string;
  body: Partial<Task>;
};

export async function updateTask({ taskId, body }: Params) {
  return httpClient.patch(endpoints.task.item(taskId), body);
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
