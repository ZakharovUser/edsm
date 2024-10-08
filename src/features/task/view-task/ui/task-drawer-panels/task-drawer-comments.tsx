import { useState } from 'react';
import { useBoolean } from 'hooks/use-boolean';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { DialogTitle, DialogActions, DialogContent, CircularProgress } from '@mui/material';

import { fDateTime } from 'utils/format-time';
import { formatUserName } from 'utils/format-user-name';

import { Task } from 'entities/task/model';
import { useCreateTaskComment } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerComments({ hidden, task, loading }: Props) {
  const [message, setMessage] = useState('');

  const dialog = useBoolean();

  const createComment = useCreateTaskComment();

  const hasMessages = task?.messages.length !== 0;

  const onClose = () => {
    dialog.onFalse();
    setMessage('');
  };

  const onSave = () => {
    if (task) {
      createComment.mutate(
        { taskId: task.task_number, message },
        {
          onSuccess: () => onClose(),
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
      <Stack spacing={1} sx={{ width: 1 }}>
        {task?.messages.map(({ id, message_text, message_date, message_by }) => (
          <Stack
            key={id}
            component={Paper}
            variant="outlined"
            sx={{
              p: 1,
              width: 1,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.z4,
              },
            }}
          >
            <ListItemText primary={`Замечание #${id}`} secondary={message_text} />

            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ mt: 1, color: 'text.disabled' }}
            >
              <Typography variant="caption">{formatUserName(message_by)}</Typography>
              <Typography variant="caption">{fDateTime(message_date)}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Button onClick={dialog.onTrue}>Add</Button>

      <Dialog open={dialog.value} onClose={onClose}>
        <DialogTitle>Добавить замечание</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            size="small"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
