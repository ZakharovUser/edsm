import { format } from 'date-fns';

import { Row } from 'entites/outbox/model';

import { Task, TaskRoute, TaskImportance } from 'shared/task/model';

export function convertTaskToRow(task: Task): Row {
  return {
    id: task.task_number,
    name: task.short_name,
    rule: TaskRoute[task.route],
    importance: TaskImportance[task.importance],
    creation_date: format(new Date(task.creation_date), 'P'),

    // Добавить в api
    author: 'None',
    department: 'None',
    completion_date: format(new Date(), 'P'),
    receipt_date: format(new Date(), 'P'),
  };
}
