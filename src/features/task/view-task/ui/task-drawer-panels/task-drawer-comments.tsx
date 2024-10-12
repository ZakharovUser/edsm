import { useAuthContext } from 'auth/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

import { Task } from 'entities/task/model';
import { Remark } from 'entities/remark/ui';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerComments({ hidden, task, loading }: Props) {
  const { user } = useAuthContext();

  const hasMessages = task?.messages.length !== 0;

  if (loading) {
    return (
      <Box hidden={hidden}>
        <Box sx={{ mx: 'auto', width: 'max-content', p: 3 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!hasMessages) {
    return (
      <Box hidden={hidden}>
        <Stack
          sx={{
            mt: 5,
            color: (theme) => theme.palette.grey['400'],
          }}
        >
          <MarkUnreadChatAltIcon sx={{ width: 100, height: 100, alignSelf: 'center' }} />
          <Typography variant="subtitle2" textAlign="center" sx={{ mb: 2 }}>
            Замечаний нет
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box hidden={hidden}>
      <Stack spacing={3} sx={{ width: 1 }}>
        {task?.messages.map(({ id, message_text, message_date, message_by }) => (
          <Remark
            key={id}
            author={message_by}
            date={message_date}
            text={message_text}
            align={user?.id === message_by.id ? 'end' : 'start'}
          />
        ))}
      </Stack>
    </Box>
  );
}
