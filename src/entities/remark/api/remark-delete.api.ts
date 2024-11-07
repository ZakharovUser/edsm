import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { root, endpoints, httpClient } from 'utils/http-client';

// -----------------------------------------------------------------------------------------------------------------

export type RemarkDeleteQueryParams = {
  task: number | string;
  remark: number | string;
};

export async function remarkDeleteQuery({ task, remark }: RemarkDeleteQueryParams) {
  return httpClient.delete(urlcat(root.api, endpoints.remark.delete, { task, message_id: remark }));
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
