import LoadingButton from '@mui/lab/LoadingButton';

import { useCancelTask } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  taskId: string | null;
  canCancel: boolean;
  text?: string;
};

export function TaskCancelButton({ taskId, canCancel, text = 'Прекратить' }: Props) {
  const { mutate, isPending } = useCancelTask();

  const onCancel = () => {
    if (taskId && canCancel) mutate({ taskId });
  };

  return (
    <LoadingButton type="button" onClick={onCancel} loading={isPending} disabled={!canCancel}>
      {text}
    </LoadingButton>
  );
}
