import urlcat from 'urlcat';

import endpoints from 'shared/api/endpoints';
import httpClient from 'shared/api/http-client';

// -----------------------------------------------------------------------------------------------------------------

export async function deleteAttachment(uuid: string) {
  const url = urlcat(endpoints.attachment.action, { uuid });

  return httpClient.delete(url).then((res) => res.status === 204);
}
