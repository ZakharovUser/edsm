import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTask } from '../api';

// -----------------------------------------------------------------------------------------------------------------

export function useCreateTaskQuery() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => client.invalidateQueries({ queryKey: ['outbox'] }),
  });
}
