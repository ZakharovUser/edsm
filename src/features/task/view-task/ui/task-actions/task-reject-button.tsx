import LoadingButton from '@mui/lab/LoadingButton';

import { useRejectTask } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  taskId: string | null;
  canReject: boolean;
  text?: string;
};

export function TaskRejectButton({ taskId, canReject, text = 'Отклонить' }: Props) {
  const { mutate, isPending } = useRejectTask();

  const onReject = () => {
    if (taskId && canReject) mutate({ taskId });
  };

  return (
    <LoadingButton type="button" onClick={onReject} loading={isPending} disabled={!canReject}>
      {text}
    </LoadingButton>
  );
}
