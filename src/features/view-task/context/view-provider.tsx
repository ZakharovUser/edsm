import { useMemo, useState, ReactNode, useCallback } from 'react';

import { View } from '../models';

import { ViewContext } from './view-context';

// -----------------------------------------------------------------------------------------------------------------

export type ViewProviderProps = {
  children: ReactNode;
};

export function ViewProvider({ children }: ViewProviderProps) {
  const [view, setView] = useState<View>(View.Summary);

  const onChangeView = useCallback((nextView: View | null) => {
    if (nextView !== null) setView(nextView);
  }, []);

  const value = useMemo(
    () => ({
      value: view,
      onChange: onChangeView,
      isSummary: view === View.Summary,
      isHistory: view === View.History,
      isComments: view === View.Comments,
      isAttachments: view === View.Attachments,
    }),
    [view, onChangeView]
  );

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}
