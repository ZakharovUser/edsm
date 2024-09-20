import React, { useState } from 'react';
import Scrollbar from 'components/scrollbar';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
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
  const [view, setView] = useState<View>(View.Summary);

  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get('task');

  const { data: task, isPending: isPendingTask } = useTask(taskId);

  const { canAccept, canApprove, canCancel, canReject } = useTaskPermissions(task);

  const isActions = canAccept || canApprove || canCancel || canReject;

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
