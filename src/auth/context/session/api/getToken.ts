import { endpoints, httpClient, CSRFTokenHeader } from 'utils/http-client';

export const getToken = async () => {
  const { headers } = await httpClient.get(endpoints.crossAuth.token);

  // @ts-ignore
  return headers.get?.(CSRFTokenHeader);
};
