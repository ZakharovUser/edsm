import React from 'react';
import { useAuthContext } from 'auth/hooks';

import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack, { StackProps } from '@mui/material/Stack';

import { useAcceptTask, useCancelTask, useApproveTask } from 'entites/task/api';

// -----------------------------------------------------------------------------------------------------------------

interface Props extends StackProps {
  taskId: null | string;
  canReject: boolean;
  canAccept: boolean;
  canCancel: boolean;
  canApprove: boolean;
}

export function TaskDrawerActions({
  sx,
  taskId,
  canAccept,
  canReject,
  canApprove,
  canCancel,
  ...props
}: Props) {
  const theme = useTheme();
  const { user } = useAuthContext();

  const { mutate: acceptTask, isPending: isPendingAcceptTask } = useAcceptTask();
  const { mutate: cancelTask, isPending: isPendingCancelTask } = useCancelTask();
  const { mutate: approveTask, isPending: isPendingApproveTask } = useApproveTask();

  const onAccept = () => {
    if (taskId && canAccept) acceptTask([taskId, { executor_id: user?.id }]);
  };

  const onApprove = () => {
    if (taskId && canApprove) approveTask([taskId]);
  };

  const onCancel = () => {
    if (taskId && canCancel) cancelTask([taskId]);
  };

  const onReject = () => {
    if (taskId && canReject) return true;
    return false;
  };

  return (
    <Stack gap={0.5} sx={{ borderTop: `dashed 1px ${theme.palette.divider}`, ...sx }} {...props}>
      <LoadingButton
        type="button"
        onClick={onAccept}
        disabled={!canAccept}
        loading={isPendingAcceptTask}
      >
        Принять
      </LoadingButton>
      <LoadingButton
        type="button"
        onClick={onApprove}
        disabled={!canApprove}
        loading={isPendingApproveTask}
      >
        Согласовать
      </LoadingButton>
      <LoadingButton type="button" disabled={!canReject} onClick={onReject}>
        Отклонить
      </LoadingButton>
      <LoadingButton
        type="button"
        onClick={onCancel}
        disabled={!canCancel}
        loading={isPendingCancelTask}
      >
        Прекратить
      </LoadingButton>
    </Stack>
  );
}
