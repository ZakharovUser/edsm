import { useMemo, useState } from 'react';

import { View } from '../models';

export function useView(initialView?: View) {
  const [view, setView] = useState<View>(initialView || View.Summary);

  return useMemo(
    () => ({
      value: view,
      onChange: setView,
      isSummary: view === View.Summary,
      isHistory: view === View.History,
      isComments: view === View.Comments,
      isAttachments: view === View.Attachments,
    }),
    [view, setView]
  );
}
