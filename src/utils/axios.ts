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

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  crossAuth: {
    session: '/api/edm/session/',
    token: '/api/edm/csrf/',
    user: '/api/edm/whoami/',
    login: '/api/edm/login/',
    logout: '/api/edm/logout/',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
