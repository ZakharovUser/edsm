import urlcat from 'urlcat';
import { useQueries, UseQueryResult } from '@tanstack/react-query';

import { httpClient } from 'utils/http-client';

import { DetailedAttachmentModel, UploadedAttachmentModel } from 'entities/attachments/model';

import endpoints from 'shared/api/endpoints';

// -----------------------------------------------------------------------------------------------------------------;

export type AttachmentResponse = {
  data: DetailedAttachmentModel;
  isPending: boolean;
  isError: boolean;
};

export async function getAttachmentLink(uuid: string) {
  const url = urlcat(endpoints.attachment.action, { uuid });

  return httpClient.get(url).then((res) => res.data);
}

export function useAttachments(attachments: UploadedAttachmentModel[] = []) {
  return useQueries({
    queries: attachments.map((attachment) => ({
      queryKey: ['attachment', attachment.response?.uuid],
      queryFn: () => attachment.response && getAttachmentLink(attachment.response.uuid),
    })),
    combine: (result: UseQueryResult<string>[]) =>
      result.map((res, idx): AttachmentResponse => {
        const attachment = attachments[idx];

        return {
          data: {
            url: res.data,
            name: attachment.name,
            size: attachment.size,
            uuid: attachment.response?.uuid,
            lastModified: attachment.lastModified,
          },
          isPending: res.isPending,
          isError: res.isError,
        };
      }),
  });
}
