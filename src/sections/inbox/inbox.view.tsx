import { _inbox_rows } from '_mock';

import { Chip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useSettingsContext } from 'components/settings';

import { NAVIGATION_CONFIG } from 'shared/navigation/config';
import { Cols, Author, Importance } from 'shared/data-grid/types';

import styles from './inbox.module.css';

// ----------------------------------------------------------------------

const columns: Cols = [
  {
    field: 'id',
    headerName: '№',
    flex: 0.3,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
  },
  {
    flex: 0.5,
    field: 'importance',
    headerName: 'Важность',
    renderCell: (params) => {
      const label: Importance = params.value;
      const color = label === 'Обычно' ? 'primary' : 'error';

      return <Chip label={label} color={color} size="small" variant="outlined" />;
    },
  },
  {
    field: 'name',
    headerName: 'Наименование',
    flex: 1,
    sortable: false,
    width: 200,
    headerAlign: 'center',
  },
  {
    field: 'rule',
    headerName: 'Регламент',
    flex: 0.5,
  },
  {
    field: 'author',
    headerName: 'Автор',
    flex: 0.5,
    headerAlign: 'center',
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const { avatarUrl, name, firstName, lastName }: Author = params.value;

      return (
        <Stack sx={{ width: '100%' }} direction="row" alignItems="center">
          <Avatar alt={name} src={avatarUrl} sx={{ width: 32, height: 32, mr: 1, minWidth: 0 }}>
            {`${firstName[0]}${lastName[0]}`.toUpperCase()}
          </Avatar>
          <span className={styles.avatarName}>{name}</span>
        </Stack>
      );
    },
  },
  {
    field: 'department',
    headerName: 'Учреждение',
    flex: 0.5,
  },
  {
    field: 'completion_date',
    headerName: 'Дата выполнения',
    flex: 0.5,
  },
  {
    field: 'receipt_date',
    headerName: 'Дата поступления',
    flex: 0.5,
  },
  {
    field: 'creation_date',
    headerName: 'Дата создания',
    flex: 0.5,
  },
];

export function InboxView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {NAVIGATION_CONFIG.INBOX.title}
      </Typography>

      <DataGrid
        autoHeight
        disableColumnMenu
        checkboxSelection
        columns={columns}
        rows={_inbox_rows}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Container>
  );
}
