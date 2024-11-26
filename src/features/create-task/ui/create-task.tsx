import { useState } from 'react';
import { useResponsive } from 'hooks/use-responsive';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import { CreateTaskModal } from './create-task-modal';

// -----------------------------------------------------------------------------------------------------------------

export function CreateTask() {
  const [open, setOpen] = useState(false);

  const downSm = useResponsive('down', 'sm');

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={onOpen}>
        {!downSm ? <Typography>Задача</Typography> : null}
      </Button>
      <CreateTaskModal open={open} onClose={onClose} />
    </>
  );
}
