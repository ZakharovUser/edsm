import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { root, endpoints, httpClient } from 'utils/http-client';

// -----------------------------------------------------------------------------------------------------------------

export type RemarkRejectQueryParams = {
  task: number | string;
  remark: number | string;
};

export async function remarkRejectQuery({ task, remark }: RemarkRejectQueryParams) {
  return httpClient.post(urlcat(root.api, endpoints.remark.reject, { task }), {
    message_id: remark,
  });
}

export function useRemarkRejectQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remarkRejectQuery,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', `${params.task}`] });
    },
  });
}
