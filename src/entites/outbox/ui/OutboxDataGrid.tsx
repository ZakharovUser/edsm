import { DataGridProps } from '@mui/x-data-grid';

import { columns } from 'entites/outbox/configs';

import { DataGrid } from 'shared/data-grid/ui';

// -----------------------------------------------------------------------------------------------------------------

export type OutboxDataGridProps = Omit<DataGridProps, 'columns'>;

export function OutboxDataGrid(props: OutboxDataGridProps) {
  return <DataGrid columns={columns} {...props} />;
}
