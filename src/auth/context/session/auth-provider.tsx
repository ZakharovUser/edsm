import { useMemo, useEffect, useReducer, useCallback, PropsWithChildren } from 'react';
import { AuthUserType, ActionMapType, AuthStateType, SessionContextType } from 'auth/types';

import { endpoints, httpClient } from 'utils/axios';

import { AuthContext } from './auth-context';

enum Methods {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Methods.INITIAL]: {
    user: AuthUserType;
    token?: string;
  };
  [Methods.LOGIN]: {
    user: AuthUserType;
  };
  [Methods.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// -----------------------------------------------------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  switch (action.type) {
    case Methods.INITIAL:
      return {
        loading: false,
        user: action.payload.user,
      };
    case Methods.LOGIN:
      return {
        ...state,
        user: action.payload.user,
      };
    case Methods.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const CSRFToken = 'X-CSRFToken';

const getSession = async () => {
  const { data } = await httpClient.get(endpoints.crossAuth.session, { withCredentials: true });

  return data;
};

const getUser = async () => {
  const { data } = await httpClient.get(endpoints.crossAuth.user, { withCredentials: true });

  return data;
};

const getCSRF = async () => {
  const { headers } = await httpClient.get(endpoints.crossAuth.token, { withCredentials: true });

  // @ts-ignore
  return headers.get?.(CSRFToken);
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    const { isAuthenticated } = await getSession();

    if (isAuthenticated) {
      const user = await getUser();

      dispatch({
        type: Methods.INITIAL,
        payload: { user },
      });
    } else {
      const token = await getCSRF();

      dispatch({
        type: Methods.INITIAL,
        payload: { user: null, token },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const res = await httpClient.post(endpoints.crossAuth.login, data, {
      withCredentials: true,
    });

    const { user } = res.data;

    dispatch({
      type: Methods.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    dispatch({ type: Methods.LOGOUT });
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    (): SessionContextType => ({
      user: state.user,
      method: 'session',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
    }),
    [login, logout, status, state.user]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
