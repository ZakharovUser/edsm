import React from 'react';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Stack, { StackProps } from '@mui/material/Stack';

// -----------------------------------------------------------------------------------------------------------------

interface Props extends StackProps {
  canAccept: boolean;
  canApprove: boolean;
  onAccept: VoidFunction;
  onCancel: VoidFunction;
  onApprove: VoidFunction;
}

export function TaskDrawerActions({
  sx,
  onAccept,
  canAccept,
  canApprove,
  onApprove,
  onCancel,
  ...props
}: Props) {
  const theme = useTheme();

  return (
    <Stack sx={{ borderTop: `dashed 1px ${theme.palette.divider}`, ...sx }} {...props}>
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
