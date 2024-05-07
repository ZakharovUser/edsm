import { _mock, _contacts } from '_mock';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { useSettingsContext } from 'components/settings';

import { NAVIGATION_CONFIG } from 'shared/navigation/config';

import styles from './inbox.module.css';

// ----------------------------------------------------------------------

type Author = (typeof _contacts)[number];

type RowDef = {
  id: number;
  name: string;
  rule: string;
  author: Author;
  importance: 'Обычно' | 'Важно';
  department: string;
  receipt_date: Date;
  creation_date: Date;
  completion_date: Date;
};

type Rows = RowDef[];

type Cols = (Omit<GridColDef, 'field'> & {
  field: keyof RowDef;
})[];

const columns: Cols = [
  {
    field: 'id',
    headerName: '№ задачи',
    sortable: false,
    filterable: false,
  },
  {
    field: 'importance',
    headerName: 'Важность',
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
  },
  {
    field: 'completion_date',
    headerName: 'Дата выполнения',
  },
  {
    field: 'receipt_date',
    headerName: 'Дата поступления',
  },
  {
    field: 'creation_date',
    headerName: 'Дата создания',
  },
];

const demo_rows: Rows = [
  {
    id: 1,
    name: _mock.postTitle(0),
    rule: 'Правило 1',
    author: _contacts[0],
    importance: 'Обычно',
    department: 'Отдел 1',
    receipt_date: new Date('2024-01-01'),
    creation_date: new Date('2024-01-02'),
    completion_date: new Date('2024-01-03'),
  },
  {
    id: 2,
    name: _mock.postTitle(3),
    rule: 'Правило 2',
    author: _contacts[3],
    importance: 'Важно',
    department: 'Отдел 2',
    receipt_date: new Date('2024-01-04'),
    creation_date: new Date('2024-01-05'),
    completion_date: new Date('2024-01-06'),
  },
  {
    id: 3,
    name: _mock.postTitle(6),
    rule: 'Правило 3',
    author: _contacts[6],
    importance: 'Обычно',
    department: 'Отдел 3',
    receipt_date: new Date('2024-01-07'),
    creation_date: new Date('2024-01-08'),
    completion_date: new Date('2024-01-09'),
  },
  {
    id: 4,
    name: _mock.postTitle(2),
    rule: 'Правило 4',
    author: _contacts[2],
    importance: 'Важно',
    department: 'Отдел 4',
    receipt_date: new Date('2024-01-10'),
    creation_date: new Date('2024-01-11'),
    completion_date: new Date('2024-01-12'),
  },
  {
    id: 5,
    name: _mock.postTitle(9),
    rule: 'Правило 5',
    author: _contacts[9],
    importance: 'Обычно',
    department: 'Отдел 5',
    receipt_date: new Date('2024-01-13'),
    creation_date: new Date('2024-01-14'),
    completion_date: new Date('2024-01-15'),
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
        rows={demo_rows}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Container>
  );
}
