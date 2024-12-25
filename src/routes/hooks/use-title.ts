import { useMemo } from 'react';

import { usePathname } from 'routes/hooks/use-pathname';

import { navigation } from '../navigation';

// -----------------------------------------------------------------------------------------------------------------

function find(pathname: string) {
  return Object.values(navigation).find((config) => pathname.includes(config.path));
}

export function useTitle() {
  const pathname = usePathname();

  const config = useMemo(() => find(pathname), [pathname]);

  return config?.title;
}
