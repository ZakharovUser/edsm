import { useQuery } from '@tanstack/react-query';

import { getTaskItem } from 'entities/task/api';

export function useTask(taskId: string | number | null) {
  return useQuery({
    enabled: !!taskId,
    queryKey: ['task', taskId],
    queryFn: ({ queryKey }) => getTaskItem(queryKey[1] as string),
  });
}
