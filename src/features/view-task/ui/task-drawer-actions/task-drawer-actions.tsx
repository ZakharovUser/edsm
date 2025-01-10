import React from 'react';
import { useAuthContext } from 'auth/hooks';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Theme, SxProps } from '@mui/material/styles';

import { useAcceptTask, useApproveTask } from 'entities/task/api';

import { toast } from 'shared/ui/snackbar';
import { HttpClientError } from 'shared/api/types';

import { TaskRejectButton } from './task-reject-button';
import { TaskCancelButton } from './task-cancel-button';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  taskId: string | null;
  permissions: {
    canAccept: boolean;
    canCancel: boolean;
    canReject: boolean;
    canApprove: boolean;
  };
  sx?: SxProps<Theme>;
}

export function TaskDrawerActions({ taskId, permissions, sx }: Props) {
  const { user } = useAuthContext();

  const { canAccept, canApprove, canCancel, canReject } = permissions;

  const { isPending: pendingAccept, mutateAsync: accept } = useAcceptTask();
  const { isPending: pendingApprove, mutateAsync: approve } = useApproveTask();

  const isActions = canAccept || canApprove || canCancel || canReject;

  if (!taskId && !isActions) return null;

  const onAccept = () => {
    if (taskId && canAccept) {
      toast.promise(accept({ taskId, executor_id: user?.id }), {
        loading: 'Загрузка',
        success: 'Задача принята в работу',
        error: (error: HttpClientError) => error.message,
      });
    }
  };

  const onApprove = () => {
    if (taskId && canApprove) {
      toast.promise(approve({ taskId }), {
        loading: 'Согласование',
        success: 'Согласовано',
        error: (error: HttpClientError) => error.message,
      });
    }
  };

  return (
    <Stack
      gap={0.5}
      sx={{ borderTop: (theme) => `dashed 1px ${theme.palette.divider}`, py: 1, ...sx }}
    >
      {canAccept && (
        <LoadingButton type="button" onClick={onAccept} loading={pendingAccept}>
          Принять
        </LoadingButton>
      )}
      {canApprove && (
        <LoadingButton type="button" onClick={onApprove} loading={pendingApprove}>
          Согласовать
        </LoadingButton>
      )}
      {canReject && <TaskRejectButton taskId={taskId} canReject={canReject} />}
      {canCancel && <TaskCancelButton taskId={taskId} canCancel={canCancel} />}
    </Stack>
  );
}
