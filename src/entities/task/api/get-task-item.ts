import urlcat from 'urlcat';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

import { Task } from '../model';

// -----------------------------------------------------------------------------------------------------------------

type Error = {
  detail: string;
};

export async function getTaskItem(id: string) {
  const url = urlcat(endpoints.task.item, { task: id });

  return httpClient.get<Task>(url).then((res) => res.data);
}

export function useTask(taskId: string | number | null) {
  return useQuery<Task, AxiosError<Error>>({
    enabled: !!taskId,
    queryKey: ['task', taskId],
    queryFn: ({ queryKey }) => getTaskItem(queryKey[1] as string),
  });
}
