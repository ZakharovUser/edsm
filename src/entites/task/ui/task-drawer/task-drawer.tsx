import React, { useState } from 'react';
import Scrollbar from 'components/scrollbar';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

import { useTask, useTaskPermissions } from 'entites/task/hooks';
import { CommentsPanel } from 'entites/task/ui/task-drawer/panels/comments-panel';
import { AttachmentsPanel } from 'entites/task/ui/task-drawer/panels/attachments-panel';

import { View } from './panels/types';
import { HistoryPanel } from './panels/history-panel';
import { SummaryPanel } from './panels/summary-panel';
import { TaskDrawerHeader } from './task-drawer-header';
import { TaskDrawerActions } from './task-drawer-actions';

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
  const { canAddComments, canAttach, ...rights } = useTaskPermissions(task);

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
          onClose={setSearchParams}
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
          <SummaryPanel
            task={task}
            iconProps={iconProps}
            loading={isPendingTask}
            hidden={view !== View.Summary}
          />

          <HistoryPanel hidden={view !== View.History} history={task?.task_history} />
          <CommentsPanel hidden={view !== View.Comments} history={task?.task_history} />
          <AttachmentsPanel hidden={view !== View.Attachments} />
        </Scrollbar>

        <TaskDrawerActions sx={{ flex: 0, py: 1 }} taskId={taskId} {...rights} />
      </Stack>
    </Drawer>
  );
}
