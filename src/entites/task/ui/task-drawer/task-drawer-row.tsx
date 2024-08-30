import React, { ReactElement, PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export interface RowProps extends PropsWithChildren {
  label: string;
  loading?: boolean;
  icon?: ReactElement;
}

export function Row({ label, loading, children, icon }: RowProps) {
  if (!children && !loading) return null;

  const Content =
    typeof children === 'string' ? (
      <Typography sx={{ flex: 1, fontSize: 14 }}>{loading ? <Skeleton /> : children}</Typography>
    ) : (
      <Box sx={{ flex: 1, fontSize: 14 }}>{loading ? <Skeleton /> : children}</Box>
    );

  return (
    <Stack
      gap={1}
      direction="row"
      alignItems="center"
      sx={{ [`&:not(:first-of-type)`]: { mt: 1 } }}
    >
      <Stack direction="row" alignItems="center" gap={0.5} sx={{ width: 150 }}>
        {icon}
        <Typography
          noWrap
          sx={{ color: (theme: Theme) => theme.palette.grey['500'], fontSize: 14 }}
        >
          {label}
        </Typography>
      </Stack>
      {Content}
    </Stack>
  );
}
