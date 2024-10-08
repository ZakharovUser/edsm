import { createContext } from 'react';

import { View } from 'features/task/view-task/models';

export type ViewContextType = {
  value: View;
  isSummary: boolean;
  isHistory: boolean;
  isComments: boolean;
  isAttachments: boolean;
  onChange(view: View | null): void;
};

export const ViewContext = createContext({} as ViewContextType);
