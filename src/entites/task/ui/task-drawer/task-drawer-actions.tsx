import React from 'react';
import { useAuthContext } from 'auth/hooks';
import { useSearchParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack, { StackProps } from '@mui/material/Stack';

import { useCancelTask, useAcceptTask, useApproveTask } from 'entites/task/api';

// -----------------------------------------------------------------------------------------------------------------

interface Props extends StackProps {
  canAccept: boolean;
  canApprove: boolean;
}

export function TaskDrawerActions({ sx, canAccept, canApprove, ...props }: Props) {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();

  const { mutate: acceptTask, isPending: isPendingAcceptTask } = useAcceptTask();
  const { mutate: cancelTask, isPending: isPendingCancelTask } = useCancelTask();
  const { mutate: approveTask, isPending: isPendingApproveTask } = useApproveTask();

  const taskId = searchParams.get('task');

  const onAccept = () => {
    if (taskId) acceptTask([taskId, { executor_id: user?.id }]);
  };

  const onApprove = () => {
    if (taskId) approveTask([taskId]);
  };

  const onCancel = () => {
    if (taskId) cancelTask([taskId]);
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
      <LoadingButton type="button" disabled>
        Отклонить
      </LoadingButton>
      <LoadingButton
        type="button"
        onClick={onCancel}
        disabled={!canApprove}
        loading={isPendingCancelTask}
      >
        Прекратить
      </LoadingButton>
    </Stack>
  );
}
