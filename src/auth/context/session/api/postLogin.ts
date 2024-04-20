import { endpoints, httpClient, CSRFTokenHeader } from 'utils/axios';

interface PostLoginProps {
  username: string;
  password: string;
  token: string;
}

export const postLogin = async ({ username, password, token }: PostLoginProps) =>
  httpClient.post(
    endpoints.crossAuth.login,
    { username, password },
    {
      headers: {
        [CSRFTokenHeader]: token,
      },
    }
  );
