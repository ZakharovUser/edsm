import { DataGridProps } from '@mui/x-data-grid';

import { DataGrid } from 'shared/data-grid/ui';

import { columns } from '../configs';

// -----------------------------------------------------------------------------------------------------------------

export type OutboxDataGridProps = Omit<DataGridProps, 'columns'>;

export function OutboxDataGrid(props: OutboxDataGridProps) {
  return <DataGrid columns={columns} {...props} />;
}
