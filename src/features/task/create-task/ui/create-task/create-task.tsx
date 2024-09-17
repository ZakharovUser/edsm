import { useState } from 'react';

import { CreateTaskModal } from 'features/task/create-task/ui/create-task-modal/create-task-modal';
import { CreateTaskButton } from 'features/task/create-task/ui/create-task-button/create-task-button';

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
