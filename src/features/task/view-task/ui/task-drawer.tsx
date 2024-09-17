import React, { useState } from 'react';
import { useAuthContext } from 'auth/hooks';
import Scrollbar from 'components/scrollbar';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { useTask, useTaskPermissions } from 'entities/task/hooks';
import { useAcceptTask, useCancelTask, useApproveTask } from 'entities/task/api';

import { View } from '../models';

import { TaskDrawerHeader } from './task-drawer-header';
import { TaskDrawerHistory } from './task-drawer-history';
import { TaskDrawerSummary } from './task-drawer-summary';
import { TaskDrawerComments } from './task-drawer-comments';
import { TaskDrawerAttachments } from './task-drawer-attachments';

// -----------------------------------------------------------------------------------------------------------------

export type Props = Omit<DrawerProps, 'onClose' | 'open'>;

// export async function getAttachmentLink(id: string) {
//   return httpClient
//     .get<{ attachment: string }>(`/api/edm/attachments/${id}`)
//     .then((res) => res.data.attachment);
// }

// -----------------------------------------------------------------------------------------------------------------

const lighten = {
  color: (theme: Theme) => theme.palette.grey['500'],
};

const iconProps = { sx: { ...lighten, fontSize: 18 } };

export function TaskDrawer(props: Props) {
  const { user } = useAuthContext();

  const [view, setView] = useState<View>(View.Summary);

  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get('task');

  const { data: task, isPending: isPendingTask } = useTask(taskId);

  const { canAccept, canApprove, canCancel, canReject } = useTaskPermissions(task);

  const { mutate: acceptTask, isPending: isPendingAcceptTask } = useAcceptTask();
  const { mutate: cancelTask, isPending: isPendingCancelTask } = useCancelTask();
  const { mutate: approveTask, isPending: isPendingApproveTask } = useApproveTask();

  const onAccept = () => {
    if (taskId && canAccept) acceptTask({ taskId, executor_id: user?.id });
  };

  const onApprove = () => {
    if (taskId && canApprove) approveTask({ taskId });
  };

  const onCancel = () => {
    if (taskId && canCancel) cancelTask({ taskId });
  };

  const onReject = () => {
    if (taskId && canReject) return true;
    return false;
  };

  return (
    <Drawer
      open={!!taskId}
      onClose={() => setSearchParams()}
      anchor="right"
      hideBackdrop
      disableScrollLock
      disableRestoreFocus
      sx={{
        width: 0,
      }}
      PaperProps={{
        sx: {
          minWidth: 400,
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

        <Box>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {task && !isPendingTask ? task.short_name : <Skeleton />}
          </Typography>

          <Typography variant="body1" sx={{ ...lighten, maxWidth: '500px', mb: 3, fontSize: 14 }}>
            {task && !isPendingTask ? task.full_name : <Skeleton />}
          </Typography>
        </Box>

        <Scrollbar sx={{ flex: 1, py: 1 }}>
          <TaskDrawerSummary
            task={task}
            iconProps={iconProps}
            loading={isPendingTask}
            hidden={view !== View.Summary}
          />

          <TaskDrawerHistory hidden={view !== View.History} history={task?.task_history} />
          <TaskDrawerComments hidden={view !== View.Comments} history={task?.task_history} />
          <TaskDrawerAttachments hidden={view !== View.Attachments} />
        </Scrollbar>

        <Stack
          gap={0.5}
          sx={{ borderTop: (theme) => `dashed 1px ${theme.palette.divider}`, flex: 0, py: 1 }}
        >
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
      </Stack>
    </Drawer>
  );
}
