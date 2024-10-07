import { UploadFile } from 'antd';

import { InstituteModel } from 'entities/institute/model';
import { UserModel } from 'entities/user/models/group.model';
import { AttachmentModel, UploadAttachmentModel } from 'entities/attachments/model';

import { Nullable } from 'shared/utils/types';

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

interface TaskHistoryStepComment {
  id: number;
  comment_text: string;
  comment_date: string;
  commented_by: UserModel;
}

export interface TaskHistoryStep {
  id: number;
  timestamp: string;
  task_status: TaskStatus;
  current_stage: TaskStage;
  executor: Nullable<UserModel>;
  comments: TaskHistoryStepComment[];
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
  creation_date: string;
  org_name: InstituteModel;
  documents: Array<AttachmentModel>;
  task_history: Array<TaskHistoryStep>;
}

export interface TaskRequest extends TaskBase {
  route: TaskRoute['id'];
  org_name: InstituteModel['id'];
  documents: UploadFile<UploadAttachmentModel>[];
}

export interface TaskPermissions {
  canReject: boolean;
  canAccept: boolean;
  canCancel: boolean;
  canAttach: boolean;
  canApprove: boolean;
  canAddComments: boolean;
  canAddAttachments: boolean;
}
