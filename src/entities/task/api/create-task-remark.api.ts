import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/http-client';

export type Params = {
  taskId: number | string;
  remark: string;
};

export async function createTaskRemark({ taskId, remark }: Params) {
  return httpClient.post(`/api/edm/task/${taskId}/add_message/`, { message: remark });
}

export function useCreateTaskRemark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskRemark,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', `${params.taskId}`] });
    },
  });
}
