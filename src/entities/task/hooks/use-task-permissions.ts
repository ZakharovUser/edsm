import { useMemo } from 'react';
import { useAuthContext } from 'auth/hooks';

import { Task, TaskStatus, TaskPermissions } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

export function useTaskPermissions(task: Task | undefined): TaskPermissions {
  const { user } = useAuthContext();

  const currentHistoryStep = task?.task_history.at(0);
  const firstHistoryStep = task?.task_history.at(-1);

  const isInGroups = !!user?.groups
    .map(({ id }) => !!currentHistoryStep?.current_stage.group.includes(id))
    .some(Boolean);

  const isNotStepExecutor = !currentHistoryStep?.executor?.id;
  const isUserCreator = firstHistoryStep?.executor?.id === user?.id;
  const isUserStepExecutor = currentHistoryStep?.executor?.id === user?.id;

  const isCanceled = currentHistoryStep?.task_status === TaskStatus.Canceled;
  const isCompleted = currentHistoryStep?.task_status === TaskStatus.Completed;
  const isAvailable = !isCanceled && !isCompleted;

  const isAccess = isUserStepExecutor && isInGroups && isAvailable;

  const canCancel = isUserCreator && isAvailable;
  const canAccept = isNotStepExecutor && isInGroups && isAvailable;

  const canAddComments = !isUserCreator && isAccess;

  return useMemo(
    () => ({
      canAccept,
      canCancel,
      canAddComments,
      canAttach: isAccess,
      canReject: isAccess,
      canApprove: isAccess,
      canAddAttachments: isAccess,
    }),
    [canAccept, canCancel, isAccess, canAddComments]
  );
}
