import { ReactElement } from 'react';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';

import { RemarkListItemProps } from './remark-list-item';

// -----------------------------------------------------------------------------------------------------------------

export type RemarkListProps = {
  subheader?: string;
  children?: ReactElement<RemarkListItemProps> | Array<ReactElement<RemarkListItemProps>> | null;
};

export function RemarkList({ children, subheader }: RemarkListProps) {
  return (
    <Stack component={List} spacing={1} sx={{ p: 0, width: 1 }}>
      {subheader && (
        <ListSubheader sx={{ bgcolor: 'transparent', textAlign: 'center' }}>
          <Typography
            variant="caption"
            sx={{ py: 0.5, px: 1.5, bgcolor: 'background.neutral', borderRadius: 1 }}
          >
            {subheader}
          </Typography>
        </ListSubheader>
      )}

      {children}
    </Stack>
  );
}
