import { endpoints, httpClient } from 'utils/http-client';

export const getUser = async () => {
  const { data } = await httpClient.get(endpoints.crossAuth.user);

  return data;
};
