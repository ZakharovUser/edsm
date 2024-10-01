import { TaskStatus } from 'entities/task/model';

export const taskStatusOptions: Record<
  TaskStatus,
  {
    label: string;
    color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  }
> = {
  [TaskStatus.New]: { color: 'info', label: 'Новая' },
  [TaskStatus.Draft]: { color: 'default', label: 'Черновик' },
  [TaskStatus.Canceled]: { color: 'error', label: 'Отменена' },
  [TaskStatus.Progress]: { color: 'secondary', label: 'В работе' },
  [TaskStatus.Completed]: { color: 'success', label: 'Завершена' },
  [TaskStatus.Refinement]: { color: 'warning', label: 'На доработке' },
};
