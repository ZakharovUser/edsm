import urlcat from 'urlcat';
import { useQueries, UseQueryResult } from '@tanstack/react-query';

import { httpClient } from 'utils/http-client';

import { AttachmentModel } from 'entities/attachments/model';

import endpoints from 'shared/api/endpoints';

// -----------------------------------------------------------------------------------------------------------------;

export type AttachmentResponse = {
  data: AttachmentModel;
  isPending: boolean;
  isError: boolean;
};

export async function getAttachmentLink(uuid: string) {
  const url = urlcat(endpoints.attachment.action, { uuid });

  return httpClient.get(url).then((res) => res.data);
}

export function useAttachments(attachments: AttachmentModel[] = []) {
  return useQueries({
    queries: attachments.map((attachment) => ({
      queryKey: ['attachment', attachment.uuid],
      queryFn: () => getAttachmentLink(attachment.uuid),
    })),
    combine: (result: UseQueryResult<string>[]) =>
      result.map<AttachmentResponse>((res, idx) => ({
        data: {
          ...attachments[idx],
          url: res.data,
        },
        isPending: res.isPending,
        isError: res.isError,
      })),
  });
}
