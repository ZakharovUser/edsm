import { useMemo, useEffect, useReducer, useCallback, PropsWithChildren } from 'react';
import { AuthUserType, ActionMapType, AuthStateType, SessionContextType } from 'auth/types';

import { endpoints, httpClient } from 'utils/axios';

import { AuthContext } from './auth-context';
import { getUser, getToken, postLogin } from './api';

enum Methods {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Methods.INITIAL]: {
    user: AuthUserType;
  };
  [Methods.LOGIN]: {
    user: AuthUserType;
    token?: string;
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
        token: action.payload.token,
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

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    const { isAuthenticated } = await httpClient
      .get(endpoints.crossAuth.session)
      .then(({ data }) => data);

    if (isAuthenticated) {
      const user = await getUser();

      dispatch({
        type: Methods.INITIAL,
        payload: { user },
      });
    } else {
      dispatch({
        type: Methods.INITIAL,
        payload: { user: null },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username: string, password: string) => {
    const token = await getToken();

    const res = await postLogin({
      token,
      username,
      password,
    });

    if (res.status === 200) {
      const user = await getUser();

      dispatch({
        type: Methods.LOGIN,
        payload: { user, token },
      });
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await httpClient.get(endpoints.crossAuth.logout);

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
