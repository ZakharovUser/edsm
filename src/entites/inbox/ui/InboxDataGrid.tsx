import { DataGridProps } from '@mui/x-data-grid';

import { columns } from 'entites/inbox/configs';

import { DataGrid } from 'shared/data-grid/ui';

// -----------------------------------------------------------------------------------------------------------------

export type InboxDataGridProps = Omit<DataGridProps, 'columns'>;

export function InboxDataGrid(props: InboxDataGridProps) {
  return <DataGrid columns={columns} {...props} />;
}
