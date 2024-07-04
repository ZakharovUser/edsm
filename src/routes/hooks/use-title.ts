import { useMemo } from 'react';

import { usePathname } from 'routes/hooks/use-pathname';

import { NAVIGATION_CONFIG } from 'shared/navigation/config';

// -----------------------------------------------------------------------------------------------------------------

function find(pathname: string) {
  return Object.values(NAVIGATION_CONFIG).find((config) => pathname.includes(config.path));
}

export function useTitle() {
  const pathname = usePathname();

  const config = useMemo(() => find(pathname), [pathname]);

  return config?.title;
}
