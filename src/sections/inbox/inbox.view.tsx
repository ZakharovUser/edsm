import { useMemo } from 'react';
import { useSettingsContext } from 'components/settings';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useGetInbox } from 'sections/inbox/hooks';

import { InboxDataGrid } from 'entites/inbox/ui';
import { convertTaskToRow } from 'entites/inbox/helpers';

import { NAVIGATION_CONFIG } from 'shared/navigation/config';

// ----------------------------------------------------------------------

export function InboxView() {
  const { data, isLoading } = useGetInbox();
  const settings = useSettingsContext();

  const inbox_rows = useMemo(() => data?.map(convertTaskToRow), [data]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {NAVIGATION_CONFIG.INBOX.title}
      </Typography>

      <InboxDataGrid rows={inbox_rows || []} loading={isLoading} />
    </Container>
  );
}
