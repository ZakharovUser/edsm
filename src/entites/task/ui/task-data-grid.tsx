import { useSearchParams } from 'react-router-dom';

import { DataGridProps } from '@mui/x-data-grid';

import { columns } from 'entites/task/configs';

import { DataGrid } from 'shared/data-grid/ui';

// -----------------------------------------------------------------------------------------------------------------

export function TaskDataGrid(props: Omit<DataGridProps, 'columns' | 'onRowClick'>) {
  const [_, setSearchParams] = useSearchParams();

  return (
    <DataGrid
      columns={columns}
      onRowClick={(params) => {
        setSearchParams(new URLSearchParams({ task: params.id.toString() }));
      }}
      {...props}
    />
  );
}
