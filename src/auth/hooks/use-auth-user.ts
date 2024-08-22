import { useAuthContext } from 'auth/hooks/use-auth-context';

export type UseAuthUserReturnType = {};

export function useAuthUser() {
  const { user } = useAuthContext();

  return user;
}
