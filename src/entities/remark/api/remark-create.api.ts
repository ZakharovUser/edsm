import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { root, endpoints, httpClient } from 'utils/http-client';

// -----------------------------------------------------------------------------------------------------------------

export type RemarkCreateQueryParams = {
  task: number | string;
  remark: number | string;
};

export async function remarkCreateQuery({ task, remark }: RemarkCreateQueryParams) {
  return httpClient.post(urlcat(root.api, endpoints.remark.create, { task }), { message: remark });
}

export function useRemarkCreateQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remarkCreateQuery,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', `${params.task}`] });
    },
  });
}
