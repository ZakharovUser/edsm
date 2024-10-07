import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';

import { Task } from 'entities/task/model';
import { Attachment } from 'entities/attachments/ui';
import { useAttachments } from 'entities/attachments/api';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerAttachments({ hidden, task, loading }: Props) {
  const links = useAttachments(task?.documents);

  const hasAttachments = task?.documents?.length !== 0;

  if (loading) {
    return (
      <Box hidden={hidden}>
        <Box sx={{ mx: 'auto', width: 'max-content', p: 3 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!hasAttachments) {
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
      </Stack>
    </Box>
  );
}
