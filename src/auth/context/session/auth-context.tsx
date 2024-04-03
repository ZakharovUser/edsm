import { createContext } from 'react';
import { SessionContextType } from 'auth/types';

// -----------------------------------------------------------------------------------------------------------------

export const AuthContext = createContext({} as SessionContextType);
