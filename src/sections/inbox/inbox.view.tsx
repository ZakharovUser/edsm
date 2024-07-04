import { _inbox_rows } from '_mock';
import { useSettingsContext } from 'components/settings';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { DataGrid } from 'shared/data-grid/ui';
import { NAVIGATION_CONFIG } from 'shared/navigation/config';

// ----------------------------------------------------------------------

export function InboxView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {NAVIGATION_CONFIG.INBOX.title}
      </Typography>

      <DataGrid rows={_inbox_rows} />
    </Container>
  );
}
