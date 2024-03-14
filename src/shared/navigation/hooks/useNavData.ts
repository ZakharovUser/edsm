import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { ICONS } from 'src/shared/icons/config';
import { NAVIGATION_CONFIG } from 'src/shared/navigation/config';

export function useNavData() {
  return useMemo(
    () => [
      // MENU
      // ----------------------------------------------------------------------
      {
        subheader: 'Меню',
        items: [
          {
            title: NAVIGATION_CONFIG.INBOX.title,
            path: paths.dashboard.inbox,
            icon: ICONS.dashboard,
          },
          {
            title: NAVIGATION_CONFIG.OUTBOX.title,
            path: paths.dashboard.outbox,
            icon: ICONS.ecommerce,
          },
          {
            title: NAVIGATION_CONFIG.DRAFTS.title,
            path: paths.dashboard.drafts,
            icon: ICONS.analytics,
          },
          {
            title: NAVIGATION_CONFIG.REPLACEMENT.title,
            path: paths.dashboard.replacement,
            icon: ICONS.dashboard,
          },
        ],
      },
    ],
    []
  );
}
