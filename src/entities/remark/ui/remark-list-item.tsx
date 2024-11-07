import { ReactElement } from 'react';

import { ListItem } from '@mui/material';

import { RemarkProps } from './remark';

// -----------------------------------------------------------------------------------------------------------------

export interface RemarkListItemProps {
  children?: ReactElement<RemarkProps> | Array<ReactElement<RemarkProps>> | null;
}

export function RemarkListItem({ children }: RemarkListItemProps) {
  return <ListItem sx={{ p: 0 }}>{children}</ListItem>;
}
