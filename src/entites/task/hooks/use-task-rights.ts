import { useMemo } from 'react';
import { useAuthContext } from 'auth/hooks';

import { Task } from 'entites/task/model';

export function useTaskRights(task: Task | undefined) {
  const { user } = useAuthContext();

  const currentHistoryStep = task?.task_history.at(-1);

  const isInGroups = !!user?.groups
    .map(({ id }) => !!currentHistoryStep?.current_stage.group.includes(id))
    .some(Boolean);

  const isNotStepExecutor = currentHistoryStep?.executor_id === null;
  const isUserStepExecutor = currentHistoryStep?.executor_id === user?.id;

  const canAccept = isNotStepExecutor && isInGroups;
  const canApprove = isUserStepExecutor && isInGroups;

  return useMemo(
    () => ({
      canAccept,
      canApprove,
      isInGroups,
      isNotStepExecutor,
      isUserStepExecutor,
    }),
    [canAccept, canApprove, isInGroups, isNotStepExecutor, isUserStepExecutor]
  );
}
