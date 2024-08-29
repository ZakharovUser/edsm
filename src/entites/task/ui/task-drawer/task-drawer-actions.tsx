import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

interface Props {
  canAccept: boolean;
  canApprove: boolean;
  onAccept: VoidFunction;
  onCancel: VoidFunction;
  onApprove: VoidFunction;
}

export function TaskDrawerActions({ onAccept, canAccept, canApprove, onApprove, onCancel }: Props) {
  const theme = useTheme();

  return (
    <Stack sx={{ flex: 0, py: 1, borderTop: `dashed 1px ${theme.palette.divider}` }}>
      <Button type="button" onClick={onAccept} disabled={!canAccept}>
        Принять
      </Button>
      <Button type="button" onClick={onApprove} disabled={!canApprove}>
        Согласовать
      </Button>
      <Button type="button" disabled>
        Отклонить
      </Button>
      <Button type="button" onClick={onCancel} disabled={!canApprove}>
        Прекратить
      </Button>
    </Stack>
  );
}
