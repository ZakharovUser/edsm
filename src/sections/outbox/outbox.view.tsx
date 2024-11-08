import { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Stack from '@mui/material/Stack';

import { ErrorView } from 'sections/error';

import { TaskDrawer } from 'features/view-task/ui';
import { TaskDataGrid } from 'features/list-task/ui';
import { convertTaskToRow } from 'features/list-task/helpers';

import { Container } from 'shared/container/ui';

import { useGetOutbox } from './hooks';

// ----------------------------------------------------------------------

export function OutboxView() {
  const { data = [], isLoading } = useGetOutbox();

  const rows = useMemo(() => data.map((task) => convertTaskToRow(task)), [data]);

  return (
    <Container>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <TaskDataGrid loading={isLoading} rows={rows} />
        <TaskDrawer />
      </ErrorBoundary>
    </Container>
  );
}

function ErrorFallback() {
  return (
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
  );
}
