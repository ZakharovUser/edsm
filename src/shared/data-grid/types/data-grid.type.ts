import { _contacts } from '_mock/_others';

import { GridColDef } from '@mui/x-data-grid';

// -----------------------------------------------------------------------------------------------------------------

export type Author = (typeof _contacts)[number];

export type Importance = 'Обычно' | 'Важно';

export type RowDef = {
  id: string;
  name: string;
  rule: string;
  author: Author;
  importance: Importance;
  department: string;
  receipt_date: Date;
  creation_date: Date;
  completion_date: Date;
};

export type Rows = RowDef[];

export type Cols = (Omit<GridColDef, 'field'> & {
  field: keyof RowDef;
})[];
