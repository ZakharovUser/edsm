import { GridColDef } from '@mui/x-data-grid';

import { TaskRoute, TaskImportance } from 'shared/task/model';

// -----------------------------------------------------------------------------------------------------------------

export type Row = {
  id: number | string;
  name: string;
  author: string;
  rule: TaskRoute;
  importance: TaskImportance;
  department: string;
  receipt_date: Date;
  creation_date: Date;
  completion_date: Date;
};

export type Rows = Row[];

export type Cols = (Omit<GridColDef, 'field'> & {
  field: keyof Row;
})[];
