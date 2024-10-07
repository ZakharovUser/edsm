import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { useView } from 'features/task/view-task/hooks';

import { Task } from 'entities/task/model';
import { useUpdateTask } from 'entities/task/api';
import { AttachmentUpload } from 'entities/attachments/ui';
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
  const view = useView();

  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get('task');

  const task = useTask(taskId);

  const updateTask = useUpdateTask();

  const permissions = useTaskPermissions(task.data);

  const onSaveAttachments = (data: Pick<Task, 'documents'>, onSuccess?: VoidFunction) => {
    if (task.data) {
      updateTask.mutate(
        {
          id: task.data.task_number,
          body: {
            documents: task.data.documents.concat(data.documents),
          },
        },
        {
          onSuccess: () => onSuccess?.(),
        }
      );
    }
  };

  const isActions = permissions.canAccept || permissions.canApprove || permissions.canCancel || permissions.canReject;

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
          view={view.value}
          sx={{ flex: 0 }}
          slots={{
            header: (
              <>
                {permissions.canAddAttachments && view.isAttachments && (
                  <AttachmentUpload.Modal onSave={onSaveAttachments} />
                )}
              </>
            ),
          }}
          onChangeView={view.onChange}
          onClose={() => setSearchParams()}
        />

        {task.error?.response && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {task.error.response?.data.detail}
          </Alert>
        )}

        <Box sx={{ overflow: 'auto', flex: 1, py: 1, pr: 2 }}>
          <TaskDrawerSummary task={task.data} loading={task.isPending} hidden={!view.isSummary} />
          <TaskDrawerHistory hidden={!view.isHistory} history={task.data?.task_history} />
          <TaskDrawerComments hidden={!view.isComments} history={task.data?.task_history} />
          <TaskDrawerAttachments task={task.data} loading={task.isPending} hidden={!view.isAttachments} />
        </Box>

        {taskId && isActions && (
          <Stack gap={0.5} sx={{ borderTop: (theme) => `dashed 1px ${theme.palette.divider}`, flex: 0, py: 1 }}>
            {permissions.canAccept && <TaskAcceptButton taskId={taskId} canAccept={permissions.canAccept} />}
            {permissions.canApprove && <TaskApproveButton taskId={taskId} canApprove={permissions.canApprove} />}
            {permissions.canReject && <TaskRejectButton taskId={taskId} canReject={permissions.canReject} />}
            {permissions.canCancel && <TaskCancelButton taskId={taskId} canCancel={permissions.canCancel} />}
          </Stack>
        )}
      </Stack>
    </Drawer>
  );
}
