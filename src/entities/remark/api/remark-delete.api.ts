import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { httpClient } from 'utils/http-client';

import endpoints from 'shared/api/endpoints';

// -----------------------------------------------------------------------------------------------------------------

export type RemarkDeleteQueryParams = {
  task: number | string;
  remark: number | string;
};

export async function remarkDeleteQuery({ task, remark }: RemarkDeleteQueryParams) {
  return httpClient.delete(urlcat(endpoints.task.remark.delete, { task, remark }));
}

export function useRemarkDeleteQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remarkDeleteQuery,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', `${params.task}`] });
    },
  });
}
