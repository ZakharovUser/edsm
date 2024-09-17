import LoadingButton from '@mui/lab/LoadingButton';

import { useApproveTask } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  text?: string;
  canApprove: boolean;
  taskId: string | null;
};

export function TaskApproveButton({ taskId, canApprove, text = 'Согласовать' }: Props) {
  const { mutate, isPending } = useApproveTask();

  const onApprove = () => {
    if (taskId && canApprove) mutate({ taskId });
  };

  return (
    <LoadingButton type="button" onClick={onApprove} loading={isPending} disabled={!canApprove}>
      {text}
    </LoadingButton>
  );
}
