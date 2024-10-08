import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/http-client';

export type Params = {
  taskId: number | string;
  message: string;
};

export async function createTaskComment({ taskId, message }: Params) {
  return httpClient.post(`/api/edm/task/${taskId}/add_message/`, { message });
}

export function useCreateTaskComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskComment,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', `${params.taskId}`] });
    },
  });
}
