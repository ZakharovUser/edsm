import { useMemo } from 'react';
import { useAuthContext } from 'auth/hooks';

import { Task, TaskStatus, TaskPermissions } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

export function useTaskPermissions(task: Task | undefined): TaskPermissions {
  const { user } = useAuthContext();

  const currentHistoryStep = task?.task_history.at(0);

  const isInGroups = !!user?.groups
    .map(({ id }) => !!currentHistoryStep?.current_stage.group.includes(id))
    .some(Boolean);

  const isUserCreator = task?.created_by.id === user?.id;

  const isNotStepExecutor = !currentHistoryStep?.executor?.id;
  const isUserStepExecutor = currentHistoryStep?.executor?.id === user?.id;

  const isCanceled = currentHistoryStep?.task_status === TaskStatus.Canceled;
  const isCompleted = currentHistoryStep?.task_status === TaskStatus.Completed;
  const isAvailable = !isCanceled && !isCompleted;

  const isAccess = isUserStepExecutor && isInGroups && isAvailable;

  const canCancel = isUserCreator && isAvailable;
  const canAccept = isNotStepExecutor && isInGroups && isAvailable;

  const canAddRemark = !isUserCreator && isAccess;
  const canResolveRemark = isUserCreator && isAvailable;

  return useMemo(
    () => ({
      canAccept,
      canCancel,
      canAddRemark,
      canResolveRemark,
      canAttach: isAccess,
      canReject: isAccess,
      canApprove: isAccess,
      canAddAttachments: isAccess,
    }),
    [canAccept, canCancel, isAccess, canAddRemark, canResolveRemark]
  );
}
