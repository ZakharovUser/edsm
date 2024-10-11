import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { ViewProvider } from 'features/task/view-task/context';

import { useTask, useTaskPermissions } from 'entities/task/hooks';

import { TaskDrawerPanels } from '../task-drawer-panels';
import { TaskDrawerActions } from '../task-drawer-actions';

import { TaskDrawerHeader } from './task-drawer-header';

// -----------------------------------------------------------------------------------------------------------------

export type Props = Omit<DrawerProps, 'onClose' | 'open'>;

export function TaskDrawer(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get('task');

  const task = useTask(taskId);

  const permissions = useTaskPermissions(task.data);

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
      <ViewProvider>
        <Stack direction="column" sx={{ height: '100%', px: 1 }}>
          <TaskDrawerHeader
            sx={{ flex: 0 }}
            taskId={taskId}
            permissions={permissions}
            onClose={() => setSearchParams()}
            concatAttachments={(attachments) =>
              task.data ? attachments.concat(task.data.documents) : attachments
            }
          />

          {task.error?.response && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {task.error.response?.data.detail}
            </Alert>
          )}

          <TaskDrawerPanels task={task.data} loading={task.isPending} sx={{ flex: 1 }} />

          <TaskDrawerActions taskId={taskId} permissions={permissions} sx={{ flex: 0 }} />
        </Stack>
      </ViewProvider>
    </Drawer>
  );
}
