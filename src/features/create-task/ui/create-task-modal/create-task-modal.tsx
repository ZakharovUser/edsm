import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { TruTaskForm } from 'entites/regulation-tru/ui';

import { useCreateTaskQuery } from 'shared/task/hooks';
import { NAVIGATION_CONFIG } from 'shared/navigation/config';

import { CreateTaskRegulations } from '../create-task-regulations/create-task-regulations';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function CreateTaskModal({ open, onClose }: Props) {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateTaskQuery();

  const [formId, setFormId] = useState<string | undefined>();

  const onSubmit = async (values: unknown) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
        navigate(`/${NAVIGATION_CONFIG.INBOX.path}`);
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Создание задачи</DialogTitle>
      <DialogContent>
        <CreateTaskRegulations
          name="regulations"
          tabs={[
            {
              id: 100,
              label: 'Закупта ТРУ',
              panel: <TruTaskForm getFormId={setFormId} onSubmit={onSubmit} />,
            },
          ]}
        />
      </DialogContent>
      <DialogActions>
        <Button form={formId} type="reset" autoFocus onClick={onClose} disabled={isPending}>
          Отменить
        </Button>
        <Button
          form={formId}
          type="submit"
          color="primary"
          variant="contained"
          disabled={isPending}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
