import { Attachment } from 'entites/attachments/model';

export interface TaskRoute {
  id: number;
  name: string;
}

export interface FinancingSource {
  id: number;
  name: string;
}

export type TaskRoutes = Array<TaskRoute>;

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
  deadline: Date;
  route: TaskRoute;
  full_name: string;
  short_name: string;
  task_number: number;
  creation_date: string;
  documents: Array<Attachment>;
  finance_source: FinancingSource;
  reason: keyof typeof TaskReason;
  importance: keyof typeof TaskImportance;
  notified_user_and_group: Array<TaskNotified>;
}
