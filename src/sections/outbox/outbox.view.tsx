import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSettingsContext } from 'components/settings';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';

import { useGetOutbox } from 'sections/outbox/hooks';

import { OutboxDataGrid } from 'entites/outbox/ui';
import { convertTaskToRow } from 'entites/outbox/helpers';

// ----------------------------------------------------------------------

export function OutboxView() {
  const { data, isLoading } = useGetOutbox();
  const [searchParams, setSearchParams] = useSearchParams();
  const settings = useSettingsContext();

  const inbox_rows = useMemo(() => data?.map(convertTaskToRow).reverse(), [data]);

  const searchedTask = searchParams.get('task');

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <OutboxDataGrid
        loading={isLoading}
        rows={inbox_rows || []}
        onRowClick={(params) => {
          setSearchParams(new URLSearchParams({ task: params.id.toString() }));
        }}
      />
      <Drawer
        open={!!searchedTask}
        onClose={() => setSearchParams()}
        anchor="right"
        hideBackdrop
        disableScrollLock
        keepMounted={false}
        sx={{
          width: 0,
        }}
        PaperProps={{
          sx: { boxShadow: '-2px 0 20px 0 rgba(145, 158, 171, 0.3) !important' },
        }}
      >
        <Box sx={{ px: 2 }}>Hello, {searchedTask}</Box>
      </Drawer>
    </Container>
  );
}
