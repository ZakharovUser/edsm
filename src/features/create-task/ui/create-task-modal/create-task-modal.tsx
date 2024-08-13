import { useRef, useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { TruTaskForm } from 'entites/regulation-tru/ui';
import { useTaskMutation, useTaskRoutesQuery } from 'entites/task/hooks';

import { CreateTaskRegulations } from '../create-task-regulations/create-task-regulations';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function CreateTaskModal({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>();

  const { data, isPending: isPendingRoutes, error: errorRoutes } = useTaskRoutesQuery();
  const { mutate, isPending: isPendingMutate, error: errorMutate, reset } = useTaskMutation();

  const [formId, setFormId] = useState<string | undefined>();

  useEffect(() => {
    if (errorMutate || errorRoutes) {
      ref.current?.scrollTo(0, 0);
    }
  }, [errorRoutes, errorMutate, ref]);

  const onSubmit = (values: unknown, onSuccess?: VoidFunction) => {
    mutate(values, {
      onSuccess: () => {
        onSuccess?.();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const tabs =
    data &&
    Object.entries(data).map(([id, name]) => ({
      id,
      label: name,
      panel: (
        <TruTaskForm
          route={id}
          onSubmit={onSubmit}
          getFormId={setFormId}
          error={errorMutate || errorRoutes}
        />
      ),
    }));

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Создание задачи</DialogTitle>
      <DialogContent ref={ref}>
        <CreateTaskRegulations name="regulations" tabs={tabs} />
      </DialogContent>
      <DialogActions>
        <Button
          form={formId}
          type="reset"
          autoFocus
          onClick={handleClose}
          disabled={isPendingMutate || isPendingRoutes}
        >
          Отменить
        </Button>
        <Button
          form={formId}
          type="submit"
          color="primary"
          variant="contained"
          disabled={isPendingMutate || isPendingRoutes}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
