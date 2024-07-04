import { useMemo } from 'react';
import { useSettingsContext } from 'components/settings';

import Container from '@mui/material/Container';

import { useGetInbox } from 'sections/inbox/hooks';

import { InboxDataGrid } from 'entites/inbox/ui';
import { convertTaskToRow } from 'entites/inbox/helpers';

// ----------------------------------------------------------------------

export function InboxView() {
  const { data, isLoading } = useGetInbox();
  const settings = useSettingsContext();

  const inbox_rows = useMemo(() => data?.map(convertTaskToRow), [data]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <InboxDataGrid rows={inbox_rows || []} loading={isLoading} />
    </Container>
  );
}
