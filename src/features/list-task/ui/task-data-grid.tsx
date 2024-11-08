import { useMemo } from 'react';
import { grey } from 'theme/palette';
import { useSearchParams } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import { DataGridProps } from '@mui/x-data-grid';

import { Cols, TaskImportance } from 'entities/task/model';

import { DataGrid } from 'shared/data-grid/ui';

// -----------------------------------------------------------------------------------------------------------------

export function TaskDataGrid(props: Omit<DataGridProps, 'columns' | 'onRowClick'>) {
  const [_, setSearchParams] = useSearchParams();

  const columns = useMemo<Cols>(
    () => [
      {
        field: 'id',
        headerName: '№',
        flex: 0.3,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Link
            underline="always"
            sx={{
              cursor: 'pointer',
              color: 'text.primary',
              textDecorationColor: grey[400],
            }}
            onClick={(event) => {
              event.preventDefault();
              setSearchParams(new URLSearchParams({ task: params.id.toString() }));
            }}
          >
            {params.id}
          </Link>
        ),
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
    ],
    [setSearchParams]
  );

  return <DataGrid columns={columns} {...props} />;
}
