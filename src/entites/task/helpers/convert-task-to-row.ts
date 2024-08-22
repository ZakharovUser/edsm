import { formatDate } from 'shared/helpers/format-date';
import { formatUserName } from 'shared/helpers/format-user-name';

import { Row, Task, TaskImportance } from '../model';

// -----------------------------------------------------------------------------------------------------------------

type Formatters = {
  [key in keyof Row]?: (task: Task) => Row[key] | undefined;
};

export function convertTaskToRow(task: Task, formatters?: Formatters): Row {
  return {
    id: formatters?.id?.(task) || task.task_number,
    rule: formatters?.rule?.(task) || task.route.name,
    name: formatters?.name?.(task) || task.short_name,
    receipt_date: formatters?.receipt_date?.(task) || '-',
    author: formatters?.author?.(task) || formatUserName(task.created_by),
    department: formatters?.department?.(task) || task.org_name.name_short,
    importance: formatters?.importance?.(task) || TaskImportance[task.importance],
    creation_date: formatters?.creation_date?.(task) || formatDate(task.creation_date),
    completion_date: formatters?.completion_date?.(task) || formatDate(task.deadline_date),
  };
}
