import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { createTask } from 'features/create-task/api';

import { TruTaskForm } from 'entites/regulation-tru/ui';

import { CreateTaskRegulations } from '../create-task-regulations/create-task-regulations';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

// -----------------------------------------------------------------------------------------------------------------

export function CreateTaskModal({ open, onClose }: Props) {
  const navigate = useNavigate();

  const [formId, setFormId] = useState<string | undefined>();

  const onSubmit = async (values: unknown) =>
    createTask(values)
      .then(onClose)
      .then(() => navigate('/inbox'));

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
        <Button form={formId} type="reset" autoFocus onClick={onClose}>
          Отменить
        </Button>
        <Button form={formId} type="submit" variant="contained" color="primary">
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
