import { useQueries, UseQueryResult } from '@tanstack/react-query';

import { httpClient } from 'utils/http-client';

import { AttachmentModel } from 'entities/attachments/model';

// -----------------------------------------------------------------------------------------------------------------;

export type AttachmentResponse = {
  data: AttachmentModel & {
    url: string | undefined;
  };
  isPending: boolean;
  isError: boolean;
};

export async function getAttachmentLink(uuid: string) {
  return httpClient.get(`/api/edm/attachments/${uuid}`).then((res) => res.data);
}

export function useAttachments(attachments: AttachmentModel[] = []) {
  return useQueries({
    queries: attachments.map((attachment) => ({
      queryKey: ['attachment', attachment.uuid],
      queryFn: () => getAttachmentLink(attachment.uuid),
    })),
    combine: (result: UseQueryResult<string>[]) =>
      result.map((res, idx): AttachmentResponse => {
        const attachment = attachments[idx];

        return {
          data: {
            url: res.data,
            name: attachment.name,
            size: attachment.size,
            uuid: attachment.uuid,
            lastModified: attachment.lastModified,
          },
          isPending: res.isPending,
          isError: res.isError,
        };
      }),
  });
}
