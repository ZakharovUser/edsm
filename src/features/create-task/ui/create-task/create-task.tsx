import { useState } from 'react';

import { CreateTaskModal } from '../create-task-modal/create-task-modal';
import { CreateTaskButton } from '../create-task-button/create-task-button';

export function CreateTask() {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <CreateTaskButton onClick={onOpen} />
      <CreateTaskModal open={open} onClose={onClose} />
    </>
  );
}
