import { AxiosError } from 'axios';

export type DjangoError = {
  detail: string;
};

export type ApiServiceError = DjangoError;

export type HttpClientError = AxiosError<ApiServiceError>;
