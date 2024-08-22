import { UploadFile } from 'antd';

import { InstituteModel } from 'entites/institute/model';
import { Attachment, UploadAttachment } from 'entites/attachments/model';

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

interface TaskBase {
  full_name: string;
  short_name: string;
  deadline_date: string;
  finance_source: FinancingSource;
  reason: keyof typeof TaskReason;
  importance: keyof typeof TaskImportance;
  notified_user_and_group: Array<TaskNotified>;
}

export interface Task extends TaskBase {
  route: TaskRoute;
  created_by: string;
  task_number: number;
  creation_date: string;
  documents: Array<Attachment>;
  org_name: InstituteModel['id'];
}

export interface TaskRequest extends TaskBase {
  route: TaskRoute['id'];
  org_name: InstituteModel['id'];
  documents: UploadFile<UploadAttachment>[];
}
