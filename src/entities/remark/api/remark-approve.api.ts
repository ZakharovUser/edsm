import urlcat from 'urlcat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { root, endpoints, httpClient } from 'utils/http-client';

// -----------------------------------------------------------------------------------------------------------------

export type RemarkApproveQueryParams = {
  task: number | string;
  remark: number | string;
};

export async function remarkApproveQuery({ task, remark }: RemarkApproveQueryParams) {
  return httpClient.post(urlcat(root.api, endpoints.remark.approve, { task }), {
    message_id: remark,
  });
}

export function useRemarkApproveQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remarkApproveQuery,
    onSuccess: (_meta, params) => {
      queryClient.invalidateQueries({ queryKey: ['task', `${params.task}`] });
    },
  });
}
