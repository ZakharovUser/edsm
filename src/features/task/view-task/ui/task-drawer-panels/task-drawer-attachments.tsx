import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';

import { Task } from 'entities/task/model';
import { Attachment } from 'entities/attachments/ui';
import { useAttachments } from 'entities/attachments/api';

import { TaskDrawerPanel } from './task-drawer-panel';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerAttachments({ hidden, task, loading }: Props) {
  const links = useAttachments(task?.documents);

  const noAttachments = task?.documents?.length === 0;

  return (
    <TaskDrawerPanel
      hidden={hidden}
      loading={loading}
      empty={noAttachments}
      emptyText="Файлов нет"
      emptyIcon={FolderIcon}
    >
      <Stack spacing={1} sx={{ width: 1 }}>
        {links.map(({ data, isPending, isError }) => (
          <Attachment download data={data} key={data.uuid} error={isError} loading={isPending} />
        ))}
      </Stack>
    </TaskDrawerPanel>
  );
}
