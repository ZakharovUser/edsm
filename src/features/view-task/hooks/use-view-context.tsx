import { useContext } from 'react';

import { ViewContext } from '../context';

// -----------------------------------------------------------------------------------------------------------------

export function useViewContext() {
  const context = useContext(ViewContext);

  if (!context) throw new Error('useViewContext context must be use inside ViewProvider');

  return context;
}
