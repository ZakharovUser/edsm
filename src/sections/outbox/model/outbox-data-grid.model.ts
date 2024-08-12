import { GridColDef } from '@mui/x-data-grid';

import { TaskRoute, TaskImportance } from 'shared/task/model';

// -----------------------------------------------------------------------------------------------------------------

export type Row = {
  name: string;
  author: string;
  rule: TaskRoute;
  department: string;
  id: number | string;
  receipt_date: string;
  creation_date: string;
  completion_date: string;
  importance: TaskImportance;
};

export type Rows = Row[];

export type Cols = (Omit<GridColDef, 'field'> & {
  field: keyof Row;
})[];
