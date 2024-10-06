import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';

import { Task } from 'entities/task/model';
import { useUpdateTask } from 'entities/task/api';
import { useAttachments } from 'entities/attachments/api';
import { Attachment, AttachmentsUpload } from 'entities/attachments/ui';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerAttachments({ hidden, task, loading }: Props) {
  const links = useAttachments(task?.documents);

  const updateTask = useUpdateTask();

  const hasAAttachments = task?.documents?.length !== 0;

  const onSave = (data: Pick<Task, 'documents'>, onSuccess?: VoidFunction) => {
    if (task) {
      updateTask.mutate(
        {
          id: task.task_number,
          body: {
            documents: task.documents.concat(data.documents),
          },
        },
        {
          onSuccess: () => onSuccess?.(),
        }
      );
    }
  };

  if (loading) {
    return (
      <Box hidden={hidden}>
        <Box sx={{ mx: 'auto', width: 'max-content', p: 3 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!hasAAttachments) {
    return (
      <Box hidden={hidden}>
        <Stack
          sx={{
            mt: 5,
            color: (theme) => theme.palette.grey['400'],
          }}
        >
          <FolderIcon sx={{ width: 100, height: 100, alignSelf: 'center' }} />
          <Typography variant="subtitle2" textAlign="center" sx={{ mb: 2 }}>
            Файлов нет
          </Typography>

          <AttachmentsUpload onSave={onSave} />
        </Stack>
      </Box>
    );
  }

  return (
    <Box hidden={hidden}>
      <Stack spacing={1} sx={{ width: 1 }}>
        {links.map(({ data, isPending, isError }) => (
          <Attachment download data={data} key={data.uuid} error={isError} loading={isPending} />
        ))}

        <AttachmentsUpload onSave={onSave} />
      </Stack>
    </Box>
  );
}
