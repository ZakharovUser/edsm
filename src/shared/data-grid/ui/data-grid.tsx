import { Chip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import {
  DataGrid as MuiDataGrid,
  GridToolbar as MuiGridToolbar,
  DataGridProps as MuiDataGridProps,
} from '@mui/x-data-grid';

import { Cols, Author, Importance } from 'shared/data-grid/types';

import styles from './data-grid.module.css';

// -----------------------------------------------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------------------------------------------

export type DataGridProps = Omit<MuiDataGridProps, 'columns'>;

export function DataGrid(props: DataGridProps) {
  return (
    <MuiDataGrid
      autoHeight
      disableColumnMenu
      checkboxSelection
      columns={columns}
      disableRowSelectionOnClick
      slots={{
        toolbar: MuiGridToolbar,
      }}
      {...props}
    />
  );
}
