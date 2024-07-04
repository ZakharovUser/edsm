import { GridToolbar, DataGridProps, DataGrid as MuiDataGrid } from '@mui/x-data-grid';

// -----------------------------------------------------------------------------------------------------------------

export function DataGrid(props: DataGridProps) {
  return (
    <MuiDataGrid
      autoHeight
      disableColumnMenu
      checkboxSelection
      disableRowSelectionOnClick
      slots={{
        toolbar: GridToolbar,
      }}
      {...props}
    />
  );
}
