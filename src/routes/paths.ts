const ROOTS = {
  AUTH: '/edm/auth',
  PATH: '/edm',
} as const;

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    session: {
      login: `${ROOTS.AUTH}/login`,
    },
  },
  // DASHBOARD
  dashboard: {
    inbox: `${ROOTS.PATH}/inbox`,
    outbox: `${ROOTS.PATH}/outbox`,
    drafts: `${ROOTS.PATH}/drafts`,
    replacement: `${ROOTS.PATH}/replacement`,
  },
} as const;
