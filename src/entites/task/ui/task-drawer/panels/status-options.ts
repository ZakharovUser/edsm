import { TimelineDotProps } from '@mui/lab';

import { TaskStatus } from 'entites/task/model';

export type StatusOption = {
  label: string;
  color: TimelineDotProps['color'];
};

export const statusOptions: Record<TaskStatus, StatusOption> = {
  [TaskStatus.New]: { color: 'info', label: 'Новая' },
  [TaskStatus.Draft]: { color: 'grey', label: 'Черновик' },
  [TaskStatus.Canceled]: { color: 'error', label: 'Отменена' },
  [TaskStatus.Progress]: { color: 'secondary', label: 'В работе' },
  [TaskStatus.Completed]: { color: 'success', label: 'Завершена' },
  [TaskStatus.Refinement]: { color: 'warning', label: 'На доработке' },
};
