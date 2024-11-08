import { FC, PropsWithChildren } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CircularProgress from '@mui/material/CircularProgress';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDrawerPanelProps extends PropsWithChildren {
  hidden: boolean;
  loading?: boolean;
  empty?: boolean;
  emptyText?: string;
  emptyIcon?: FC<SvgIconProps>;
}

export function TaskDrawerPanel({
  empty,
  hidden,
  loading,
  children,
  emptyText,
  emptyIcon,
}: TaskDrawerPanelProps) {
  if (loading) {
    return (
      <Box hidden={hidden}>
        <Box sx={{ mx: 'auto', width: 'max-content', p: 3 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!children || empty) {
    return (
      <Box hidden={hidden}>
        <Empty text={emptyText} icon={emptyIcon} />
      </Box>
    );
  }

  return <Box hidden={hidden}>{children}</Box>;
}

// -----------------------------------------------------------------------------------------------------------------

interface EmptyProps {
  icon?: FC<SvgIconProps>;
  text?: string;
}

function Empty({ icon, text }: EmptyProps) {
  const Icon = icon ?? SearchOffIcon;

  return (
    <Stack
      sx={{
        mt: 5,
        color: (theme) => theme.palette.grey['400'],
      }}
    >
      <Icon sx={{ width: 100, height: 100, alignSelf: 'center' }} />
      <Typography variant="subtitle2" textAlign="center" sx={{ mb: 2 }}>
        {text ?? 'Пусто'}
      </Typography>
    </Stack>
  );
}
