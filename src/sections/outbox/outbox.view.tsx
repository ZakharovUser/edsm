import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSettingsContext } from 'components/settings';

import Container from '@mui/material/Container';

import { useGetOutbox } from './hooks';
import { convertTaskToRow } from './helpers';
import { OutboxDrawer, OutboxDataGrid } from './ui';

// ----------------------------------------------------------------------

export function OutboxView() {
  const settings = useSettingsContext();
  const { data, isLoading } = useGetOutbox();
  const [searchParams, setSearchParams] = useSearchParams();

  const inbox_rows = useMemo(() => data?.map(convertTaskToRow).reverse(), [data]);

  const taskId = searchParams.get('task');

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <OutboxDataGrid
        loading={isLoading}
        rows={inbox_rows || []}
        onRowClick={(params) => {
          setSearchParams(new URLSearchParams({ task: params.id.toString() }));
        }}
      />
      <OutboxDrawer open={!!taskId} taskId={taskId} onClose={() => setSearchParams()} />
    </Container>
  );
}
