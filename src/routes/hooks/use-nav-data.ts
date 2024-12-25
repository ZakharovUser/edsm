import { useMemo } from 'react';

import { paths } from 'routes/paths';

import { ICONS } from 'shared/icons/config';

import { navigation } from '../navigation';

export function useNavData() {
  return useMemo(
    () => [
      // MENU
      // ----------------------------------------------------------------------
      {
        subheader: 'Меню',
        items: [
          {
            title: navigation.inbox.title,
            path: paths.dashboard.inbox,
            icon: ICONS.dashboard,
          },
          {
            title: navigation.outbox.title,
            path: paths.dashboard.outbox,
            icon: ICONS.ecommerce,
          },
          {
            title: navigation.drafts.title,
            path: paths.dashboard.drafts,
            icon: ICONS.analytics,
          },
          {
            title: navigation.replacement.title,
            path: paths.dashboard.replacement,
            icon: ICONS.dashboard,
          },
        ],
      },
    ],
    []
  );
}
