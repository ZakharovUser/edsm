import { endpoints, httpClient } from 'utils/axios';

export const getUser = async () => {
  const { data } = await httpClient.get(endpoints.crossAuth.user);

  return data;
};
