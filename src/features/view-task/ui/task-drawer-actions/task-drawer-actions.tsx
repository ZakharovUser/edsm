import React from 'react';

import Stack from '@mui/material/Stack';
import { Theme, SxProps } from '@mui/material/styles';

import { TaskPermissions } from 'entities/task/model';

import { TaskAcceptButton } from './task-accept-button';
import { TaskRejectButton } from './task-reject-button';
import { TaskCancelButton } from './task-cancel-button';
import { TaskApproveButton } from './task-approve-button';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  taskId: string | null;
  permissions: TaskPermissions;
  sx?: SxProps<Theme>;
}

export function TaskDrawerActions({ taskId, permissions, sx }: Props) {
  const { canAccept, canApprove, canCancel, canReject } = permissions;

  const isActions = canAccept || canApprove || canCancel || canReject;

  if (!taskId && !isActions) return null;

  return (
    <Stack
      gap={0.5}
      sx={{ borderTop: (theme) => `dashed 1px ${theme.palette.divider}`, py: 1, ...sx }}
    >
      {canAccept && <TaskAcceptButton taskId={taskId} canAccept={canAccept} />}
      {canApprove && <TaskApproveButton taskId={taskId} canApprove={canApprove} />}
      {canReject && <TaskRejectButton taskId={taskId} canReject={canReject} />}
      {canCancel && <TaskCancelButton taskId={taskId} canCancel={canCancel} />}
    </Stack>
  );
}
