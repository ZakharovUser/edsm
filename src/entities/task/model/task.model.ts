import { UploadFile } from 'antd';

import { InstituteModel } from 'entities/institute/model';
import { Attachment, UploadAttachment } from 'entities/attachments/model';

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

export enum TaskStatus {
  New = 'new',
  Draft = 'draft',
  Canceled = 'canceled',
  Completed = 'completed',
  Progress = 'in_progress',
  Refinement = 'refinement',
}

export interface TaskStage {
  id: number;
  route: number;
  stage_name: string;
  order_number: number;
  group: Array<number>;
}

export interface TaskHistoryStep {
  timestamp: string;
  task_status: TaskStatus;
  current_stage: TaskStage;
  executor_id: number | null;
  comments: string[];
}

export interface TaskMembers {
  creator_id: number;
  executor_id: null | number;
  supervisor_id: null | number;
}

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
  members: TaskMembers;
  creation_date: string;
  org_name: InstituteModel;
  documents: Array<Attachment>;
  task_history: Array<TaskHistoryStep>;
}

export interface TaskRequest extends TaskBase {
  route: TaskRoute['id'];
  org_name: InstituteModel['id'];
  documents: UploadFile<UploadAttachment>[];
}

export interface TaskPermissions {
  canReject: boolean;
  canAccept: boolean;
  canCancel: boolean;
  canAttach: boolean;
  canApprove: boolean;
  canAddComments: boolean;
}
