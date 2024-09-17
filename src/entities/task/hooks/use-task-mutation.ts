import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTask } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

export function useTaskMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => client.invalidateQueries({ queryKey: ['outbox'] }),
  });
}