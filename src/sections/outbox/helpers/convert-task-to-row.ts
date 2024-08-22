import { Task, TaskImportance } from 'entites/task/model';

import { formatDate } from 'shared/helpers/format-date';

import { Row } from '../model';

// -----------------------------------------------------------------------------------------------------------------

type Formatters = {
  [key in keyof Row]?: (task: Task) => Row[key] | undefined;
};

export function convertTaskToRow(task: Task, formatters?: Formatters): Row {
  return {
    author: formatters?.author?.(task) || '-',
    id: formatters?.id?.(task) || task.task_number,
    rule: formatters?.rule?.(task) || task.route.name,
    name: formatters?.name?.(task) || task.short_name,
    department: formatters?.department?.(task) || '-',
    receipt_date: formatters?.receipt_date?.(task) || '-',
    importance: formatters?.importance?.(task) || TaskImportance[task.importance],
    creation_date: formatters?.creation_date?.(task) || formatDate(task.creation_date),
    completion_date: formatters?.completion_date?.(task) || formatDate(task.deadline_date),
  };
}
