import { useMemo } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import Stack from '@mui/material/Stack';

import { ErrorView } from 'sections/error';

import { TaskDrawer } from 'entites/task/ui/task-drawer/task-drawer';

import { Container } from 'shared/container/ui';

import { Task } from '../model';
import { convertTaskToRow } from '../helpers';

import { TaskDataGrid } from './task-data-grid';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  tasks: Task[];
  loading?: boolean;
}

function _TaskView({ tasks, loading }: Props) {
  const rows = useMemo(() => tasks?.map((task) => convertTaskToRow(task)), [tasks]);

  return (
    <Container>
      <TaskDataGrid loading={loading} rows={rows} />
      <TaskDrawer />
    </Container>
  );
}

export const TaskView = withErrorBoundary(_TaskView, {
  fallback: (
    <Stack
      sx={{
        py: 12,
        m: 'auto',
        maxWidth: 400,
        minHeight: '100vh',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorView />
    </Stack>
  ),
});
