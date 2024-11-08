import React, { ReactElement, cloneElement, PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { Theme, SxProps } from '@mui/material/styles';

// -----------------------------------------------------------------------------------------------------------------

export interface RowProps extends PropsWithChildren {
  label: string;
  loading?: boolean;
  sx?: SxProps<Theme>;
  icon?: ReactElement<SvgIconProps>;
}

export function TaskDrawerSummaryRow({ label, loading, children, icon, sx }: RowProps) {
  if (!children && !loading) return null;

  const Icon = icon
    ? cloneElement(icon, {
        sx: { color: (theme: Theme) => theme.palette.grey['500'], fontSize: 18 },
      })
    : null;

  return (
    <Stack
      gap={1}
      direction="row"
      alignItems="center"
      sx={{ [`&:not(:first-of-type)`]: { mt: 1 } }}
    >
      <Stack direction="row" alignItems="center" gap={0.5} sx={{ width: 230 }}>
        {Icon}
        <Typography
          noWrap
          sx={{ color: (theme: Theme) => theme.palette.grey['500'], fontSize: 14 }}
        >
          {label}
        </Typography>
      </Stack>

      <Box sx={{ flex: 1, fontSize: 14, ...sx }}>{loading ? <Skeleton /> : children}</Box>
    </Stack>
  );
}
