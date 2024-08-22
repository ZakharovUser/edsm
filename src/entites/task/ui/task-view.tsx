import { useMemo } from 'react';
import { useSettingsContext } from 'components/settings';

import Container from '@mui/material/Container';

import { Task } from '../model';
import { convertTaskToRow } from '../helpers';

import { TaskDrawer } from './task-drawer';
import { TaskDataGrid } from './task-data-grid';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  tasks: Task[];
  loading?: boolean;
}

export function TaskView({ tasks, loading }: Props) {
  const settings = useSettingsContext();

  const rows = useMemo(() => tasks?.map((task) => convertTaskToRow(task)), [tasks]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <TaskDataGrid loading={loading} rows={rows} />
      <TaskDrawer />
    </Container>
  );
}
