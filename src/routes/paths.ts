// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
};

// ----------------------------------------------------------------------

export const PAGES_PATHS = {
  INBOX: 'inbox',
  OUTBOX: 'outbox',
  DRAFTS: 'drafts',
  REPLACEMENT: 'replacement',
};

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    inbox: `/${PAGES_PATHS.INBOX}`,
    outbox: `/${PAGES_PATHS.OUTBOX}`,
    drafts: `/${PAGES_PATHS.DRAFTS}`,
    replacement: `/${PAGES_PATHS.REPLACEMENT}`,
  },
};
