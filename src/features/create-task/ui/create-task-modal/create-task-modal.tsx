import { useState } from 'react';
import { FormInstance } from 'antd';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { CreateTaskForm } from '../create-task-form/create-task-form';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function CreateTaskModal({ open, onClose }: Props) {
  const [form, setForm] = useState<null | FormInstance>(null);

  const handleClose = () => {
    form?.resetFields();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Создание задачи</DialogTitle>
      <DialogContent>
        <CreateTaskForm onInitForm={(f) => setForm(f)} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="contained" color="primary">
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
