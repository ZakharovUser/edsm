import { Chip } from '@mui/material';

import { TaskImportance } from 'shared/task/model';

import { Cols } from '../model';

// -----------------------------------------------------------------------------------------------------------------

export const columns: Cols = [
  {
    field: 'id',
    headerName: '№',
    flex: 0.3,
    sortable: false,
    filterable: false,
  },
  {
    field: 'importance',
    headerName: 'Важность',
    flex: 0.5,
    sortable: true,
    renderCell: (params) => {
      const label: TaskImportance = params.value;
      const color = label === TaskImportance.ordinary ? 'success' : 'error';

      return <Chip label={label} color={color} size="small" variant="outlined" />;
    },
  },
  {
    field: 'name',
    headerName: 'Наименование',
    flex: 1,
    width: 200,
    sortable: false,
  },
  {
    field: 'rule',
    headerName: 'Регламент',
    flex: 0.5,
    sortable: false,
  },
  {
    field: 'author',
    headerName: 'Автор',
    flex: 0.5,
    sortable: false,
    filterable: false,
    // renderCell: (params) => {
    //   const { avatarUrl, name, firstName, lastName }: Author = params.value;
    //
    //   return (
    //     <Stack sx={{ width: '100%' }} direction="row" alignItems="center">
    //       <Avatar alt={name} src={avatarUrl} sx={{ width: 32, height: 32, mr: 1, minWidth: 0 }}>
    //         {`${firstName[0]}${lastName[0]}`.toUpperCase()}
    //       </Avatar>
    //     <span className={styles.avatarName}>{name}</span>
    //     </Stack>
    //   );
    // },
  },
  {
    field: 'department',
    headerName: 'Учреждение',
    flex: 0.5,
    sortable: false,
  },
  {
    field: 'completion_date',
    headerName: 'Дата выполнения',
    flex: 0.5,
    sortable: false,
  },
  {
    field: 'receipt_date',
    headerName: 'Дата поступления',
    flex: 0.5,
    sortable: false,
  },
  {
    field: 'creation_date',
    headerName: 'Дата создания',
    flex: 0.5,
    sortable: false,
  },
];
