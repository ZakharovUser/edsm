import { format } from 'date-fns';

import { Task, TaskImportance } from 'entites/task/model';

import { Row } from '../model';

// -----------------------------------------------------------------------------------------------------------------

type Formatters = {
  [key in keyof Row]?: (task: Task) => Row[key] | undefined;
};

export function convertTaskToRow(task: Task, formatters?: Formatters): Row {
  return {
    id: formatters?.id?.(task) || task.task_number,
    name: formatters?.name?.(task) || task.short_name,
    rule: formatters?.rule?.(task) || task.route.toString(),
    importance: formatters?.importance?.(task) || TaskImportance[task.importance],
    creation_date: formatters?.creation_date?.(task) || format(new Date(task.creation_date), 'P'),

    // Добавить в api
    author: formatters?.author?.(task) || 'None',
    department: formatters?.department?.(task) || 'None',
    completion_date: formatters?.completion_date?.(task) || format(new Date(), 'P'),
    receipt_date: formatters?.receipt_date?.(task) || format(new Date(), 'P'),
  };
}
