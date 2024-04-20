import { endpoints, httpClient, CSRFTokenHeader } from 'utils/axios';

export const getToken = async () => {
  const { headers } = await httpClient.get(endpoints.crossAuth.token);

  // @ts-ignore
  return headers.get?.(CSRFTokenHeader);
};
