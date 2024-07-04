import { Attachment } from 'shared/attachments/model';

export enum TaskRoute {
  tru = 'ТРУ',
}

export enum TaskImportance {
  ordinary = 'Обычно',
  very_important = 'Важно',
}

export enum TaskReason {
  alarm = 'Аварийная ситуация',
  error = 'Ошибка планирования',
  lost_time = 'Позднее доведение лимитов',
}

type NotifiedUser = { type: 'user'; value: string };
type NotifiedGroup = { type: 'group'; value: number };

export type TaskNotified = NotifiedUser | NotifiedGroup;

export interface Task {
  full_name: string;
  short_name: string;
  task_number: number;
  creation_date: string;
  finance_source: number;
  documents: Array<Attachment>;
  route: keyof typeof TaskRoute;
  reason: keyof typeof TaskReason;
  importance: keyof typeof TaskImportance;
  notified_user_and_group: Array<TaskNotified>;
}
