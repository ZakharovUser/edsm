import { useBoolean } from 'hooks/use-boolean';

import { Callback } from 'shared/types';

import { TaskDeadlineExtendButton } from './task-deadline-extend-button';
import { TaskDeadlineExtendForm, TaskDeadlineExtendFormProps } from './task-deadline-extend-form';

// -----------------------------------------------------------------------------------------------------------------

type TaskDeadlineExtendProps = Omit<TaskDeadlineExtendFormProps, 'open' | 'onClose'> & {
  onReset: Callback;
};

export function TaskDeadlineExtend({
  value,
  error,
  loading,
  onSubmit,
  onReset,
}: TaskDeadlineExtendProps) {
  const dialog = useBoolean();

  const onClose = () => {
    onReset?.();
    dialog.onFalse();
  };

  return (
    <>
      <TaskDeadlineExtendButton title="Запросить продление" onClick={dialog.onTrue} />
      <TaskDeadlineExtendForm
        value={value}
        error={error}
        loading={loading}
        open={dialog.value}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
}
