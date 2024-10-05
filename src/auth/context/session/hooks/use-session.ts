import { useQuery } from '@tanstack/react-query';

import { ResponseError } from 'utils/http-client';

import { getSession } from '../api';

// -----------------------------------------------------------------------------------------------------------------

interface Response {
  isAuthenticated: boolean;
}

type Error = ResponseError<Response>;

export function useSession() {
  return useQuery<Response, Error>({
    queryKey: ['session'],
    queryFn: getSession,
  });
}
