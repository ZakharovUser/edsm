import { GridColDef } from '@mui/x-data-grid';

import { TaskImportance } from './task.model';

// -----------------------------------------------------------------------------------------------------------------

export type Row = {
  name: string;
  author: string;
  rule: string;
  department: string;
  id: number | string;
  receipt_date: string;
  creation_date: string;
  completion_date: string;
  importance: TaskImportance;
};

export type Cols = (Omit<GridColDef, 'field'> & {
  field: keyof Row;
})[];
