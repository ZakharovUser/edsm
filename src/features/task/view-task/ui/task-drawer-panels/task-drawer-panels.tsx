import React from 'react';

import Box from '@mui/material/Box';
import { Theme, SxProps } from '@mui/material/styles';

import { useViewContext } from 'features/task/view-task/hooks';

import { Task } from 'entities/task/model';

import { TaskDrawerHistory } from './task-drawer-history';
import { TaskDrawerComments } from './task-drawer-comments';
import { TaskDrawerAttachments } from './task-drawer-attachments';
import { TaskDrawerSummary } from './task-drawer-summary/task-drawer-summary';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  task: Task | undefined;
  loading?: boolean;
  sx?: SxProps<Theme>;
}

export function TaskDrawerPanels({ task, loading, sx }: Props) {
  const view = useViewContext();

  return (
    <Box sx={{ overflow: 'auto', py: 1, px: 2, ...sx }}>
      <TaskDrawerSummary task={task} loading={loading} hidden={!view.isSummary} />
      <TaskDrawerHistory history={task?.task_history} hidden={!view.isHistory} />
      <TaskDrawerComments task={task} loading={loading} hidden={!view.isComments} />
      <TaskDrawerAttachments task={task} loading={loading} hidden={!view.isAttachments} />
    </Box>
  );
}
