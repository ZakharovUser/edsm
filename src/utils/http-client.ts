import { HOST_API } from 'config-global';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

export const CSRFTokenHeader = 'X-Csrftoken';

// -----------------------------------------------------------------------------------------------------------------

export const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error || 'Something went wrong')
);

// -----------------------------------------------------------------------------------------------------------------

export type UseResponseError<E extends Error> = E extends Error ? E : never;

export type ResponseError<Res = any, Req = any> = UseResponseError<AxiosError<Req, Res>>;

export const httpClient = axios.create({
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const root = {
  api: '/api/edm',
};

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  crossAuth: {
    token: `${root.api}/csrf/`,
    user: `${root.api}/whoami/`,
    login: `${root.api}/login/`,
    logout: `${root.api}/logout/`,
    session: `${root.api}/session/`,
  },
  attachment: {
    post: `${root.api}/attachments/`,
  },
};
