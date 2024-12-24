import { useCallback } from 'react';
import { useAuthContext } from 'auth/hooks';

import List from '@mui/material/List';

import { Task } from 'entities/task/model';
import { useTaskPermissions } from 'entities/task/hooks';
import {
  useTaskDeadlineReject,
  useTaskDeadlineDelete,
  useTaskDeadlineApprove,
} from 'entities/task/api';

import { toast } from 'shared/ui/snackbar';
import { HttpClientError } from 'shared/api/types';

import { TaskDrawerPanel } from '../task-drawer-panel';

import { TaskDrawerRequestItem } from './task-drawer-request-item';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDrawerRequestsProps {
  hidden: boolean;
  loading?: boolean;
  task: Task | undefined;
}

export function TaskDrawerRequests({ hidden, loading, task }: TaskDrawerRequestsProps) {
  const { user } = useAuthContext();

  const { canResolveRequest } = useTaskPermissions(task);

  const reject = useTaskDeadlineReject();
  const remove = useTaskDeadlineDelete();
  const approve = useTaskDeadlineApprove();

  const onApprove = useCallback(
    (requestId: string) => {
      if (task?.task_number) {
        const promise = approve.mutateAsync({
          taskId: task.task_number.toString(),
          requestId,
        });

        toast.promise(promise, {
          loading: 'Отправка',
          success: 'Запрос принят',
          error: (error: HttpClientError) => error.response?.data.detail || 'Ошибка',
        });
      }
    },
    [task?.task_number, approve]
  );

  const onReject = useCallback(
    (requestId: string) => {
      if (task?.task_number) {
        const promise = reject.mutateAsync({
          taskId: task.task_number.toString(),
          requestId,
        });

        toast.promise(promise, {
          loading: 'Отправка',
          success: 'Запрос отклонен',
          error: (error: HttpClientError) => error.response?.data.detail || 'Ошибка',
        });
      }
    },
    [task?.task_number, reject]
  );

  const onDelete = useCallback(
    (requestId: string) => {
      if (task?.task_number) {
        const promise = remove.mutateAsync({
          taskId: task.task_number.toString(),
          requestId,
        });

        toast.promise(promise, {
          loading: 'Отправка',
          success: 'Запрос удален',
          error: (error: HttpClientError) => error.response?.data.detail || 'Ошибка',
        });
      }
    },
    [task?.task_number, remove]
  );

  const noRequests = task?.extension_requests.length === 0;

  return (
    <TaskDrawerPanel hidden={hidden} loading={loading} empty={noRequests} emptyText="Запросов нет">
      <List sx={{ p: 0, display: 'flex', gap: 2, flexDirection: 'column' }}>
        {task?.extension_requests.map((request) => {
          const canDelete = request.requested_by.id === user?.id;

          return (
            <TaskDrawerRequestItem
              key={request.id}
              request={request}
              onReject={onReject}
              onDelete={onDelete}
              onApprove={onApprove}
              canDelete={canDelete}
              canResolve={canResolveRequest}
              rejectLoading={reject.isPending}
              deleteLoading={remove.isPending}
              approveLoading={approve.isPending}
            />
          );
        })}
      </List>
    </TaskDrawerPanel>
  );
}
