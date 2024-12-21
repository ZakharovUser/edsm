import { createContext } from 'react';

import { View } from 'features/view-task/models';

export type ViewContextType = {
  value: View;
  isSummary: boolean;
  isHistory: boolean;
  isRequests: boolean;
  isComments: boolean;
  isAttachments: boolean;
  onChange(view: View | null): void;
};

export const ViewContext = createContext({} as ViewContextType);
