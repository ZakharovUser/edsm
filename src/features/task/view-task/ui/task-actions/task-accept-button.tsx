import { useAuthContext } from 'auth/hooks';

import LoadingButton from '@mui/lab/LoadingButton';

import { useAcceptTask } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  text?: string;
  canAccept: boolean;
  taskId: string | null;
};

export function TaskAcceptButton({ canAccept, taskId, text = 'Принять' }: Props) {
  const { user } = useAuthContext();

  const { mutate, isPending } = useAcceptTask();

  const onAccept = () => {
    if (taskId && canAccept) mutate({ taskId, executor_id: user?.id });
  };

  return (
    <LoadingButton type="button" onClick={onAccept} loading={isPending} disabled={!canAccept}>
      {text}
    </LoadingButton>
  );
}
