import { useMemo } from 'react';
import { useSettingsContext } from 'components/settings';

import Container from '@mui/material/Container';

import { useGetOutbox } from 'sections/outbox/hooks';

import { OutboxDataGrid } from 'entites/outbox/ui';
import { convertTaskToRow } from 'entites/outbox/helpers';

// ----------------------------------------------------------------------

export function OutboxView() {
  const { data, isLoading } = useGetOutbox();
  const settings = useSettingsContext();

  const inbox_rows = useMemo(() => data?.map(convertTaskToRow).reverse(), [data]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <OutboxDataGrid rows={inbox_rows || []} loading={isLoading} />
    </Container>
  );
}
