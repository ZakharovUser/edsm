import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { View } from 'features/task/view-task/models';

import { useTask, useTaskPermissions } from 'entities/task/hooks';

import { TaskRejectButton } from '../task-actions/task-reject-button';
import { TaskCancelButton } from '../task-actions/task-cancel-button';
import { TaskAcceptButton } from '../task-actions/task-accept-button';
import { TaskApproveButton } from '../task-actions/task-approve-button';

import { TaskDrawerHeader } from './task-drawer-header';
import { TaskDrawerHistory } from './task-drawer-history';
import { TaskDrawerSummary } from './task-drawer-summary';
import { TaskDrawerComments } from './task-drawer-comments';
import { TaskDrawerAttachments } from './task-drawer-attachments';

// -----------------------------------------------------------------------------------------------------------------

export type Props = Omit<DrawerProps, 'onClose' | 'open'>;

export function TaskDrawer(props: Props) {
  const [view, setView] = useState<View>(View.Summary);

  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get('task');

  const task = useTask(taskId);

  const { canAccept, canApprove, canCancel, canReject } = useTaskPermissions(task.data);

  const isActions = canAccept || canApprove || canCancel || canReject;

  return (
    <Drawer
      open={!!taskId}
      onClose={() => setSearchParams()}
      anchor="right"
      disableRestoreFocus
      ModalProps={{
        slotProps: {
          backdrop: {
            sx: { bgcolor: 'transparent' },
          },
        },
      }}
      PaperProps={{
        sx: {
          width: 500,
        },
      }}
      {...props}
    >
      <Stack direction="column" sx={{ height: '100%', px: 1 }}>
        <TaskDrawerHeader
          view={view}
          sx={{ flex: 0 }}
          onChangeView={setView}
          onClose={() => setSearchParams()}
        />

        {task.error?.response && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {task.error.response?.data.detail}
          </Alert>
        )}

        <Box sx={{ overflow: 'auto', flex: 1, py: 1, pr: 2 }}>
          <TaskDrawerSummary
            task={task.data}
            loading={task.isPending}
            hidden={view !== View.Summary}
          />
          <TaskDrawerHistory hidden={view !== View.History} history={task.data?.task_history} />
          <TaskDrawerComments hidden={view !== View.Comments} history={task.data?.task_history} />
          <TaskDrawerAttachments
            task={task.data}
            loading={task.isPending}
            hidden={view !== View.Attachments}
          />
        </Box>

        {isActions && (
          <Stack
            gap={0.5}
            sx={{ borderTop: (theme) => `dashed 1px ${theme.palette.divider}`, flex: 0, py: 1 }}
          >
            {taskId && canAccept && <TaskAcceptButton taskId={taskId} canAccept={canAccept} />}
            {taskId && canApprove && <TaskApproveButton taskId={taskId} canApprove={canApprove} />}
            {taskId && canReject && <TaskRejectButton taskId={taskId} canReject={canReject} />}
            {taskId && canCancel && <TaskCancelButton taskId={taskId} canCancel={canCancel} />}
          </Stack>
        )}
      </Stack>
    </Drawer>
  );
}
