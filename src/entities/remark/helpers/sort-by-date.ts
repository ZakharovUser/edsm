import { format, parseISO } from 'date-fns';

import { TaskMessage } from 'entities/task/model';

export function sortByDate(remarks: TaskMessage[] = []) {
  const map = new Map<string, TaskMessage[]>();

  remarks.forEach((remark) => {
    const date = parseISO(remark.message_date);
    const formatted = format(date, 'yyyy-MM-dd');

    if (map.has(formatted)) {
      map.get(formatted)?.push(remark);
    } else {
      map.set(formatted, [remark]);
    }
  });

  return Array.from(map.entries());
}
