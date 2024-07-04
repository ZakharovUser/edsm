import { Row } from 'entites/inbox/model';

import { Task, TaskRoute, TaskImportance } from 'shared/task/model';

export function convertTaskToRow(task: Task): Row {
  return {
    id: task.task_number,
    name: task.short_name,
    rule: TaskRoute[task.route],
    importance: TaskImportance[task.importance],
    creation_date: new Date(task.creation_date),

    // Добавить в api
    author: 'None',
    department: 'None',
    completion_date: new Date(),
    receipt_date: new Date(),
  };
}
