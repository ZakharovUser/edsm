import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Task } from 'entities/task/model';
import { getTaskItem } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Error = {
  detail: string;
};

export function useTask(taskId: string | number | null) {
  return useQuery<Task, AxiosError<Error>>({
    enabled: !!taskId,
    queryKey: ['task', taskId],
    queryFn: ({ queryKey }) => getTaskItem(queryKey[1] as string),
  });
}
