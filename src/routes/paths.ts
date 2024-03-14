import { NAVIGATION_CONFIG } from 'src/shared/navigation/config';

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
};

// ----------------------------------------------------------------------

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
    inbox: `/${NAVIGATION_CONFIG.INBOX.path}`,
    outbox: `/${NAVIGATION_CONFIG.OUTBOX.path}`,
    drafts: `/${NAVIGATION_CONFIG.DRAFTS.path}`,
    replacement: `/${NAVIGATION_CONFIG.REPLACEMENT.path}`,
  },
};
