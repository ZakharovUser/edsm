import { useState } from 'react';
import { useBoolean } from 'hooks/use-boolean';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { DialogTitle, DialogActions, DialogContent, CircularProgress } from '@mui/material';

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

  const onSave = () => {
    if (task) {
      createComment.mutate(
        { taskId: task.task_number, message },
        {
          onSuccess: () => {
            setMessage('');
          },
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
      {task?.messages.map(({ id, message_text }) => (
        <Typography key={id}>{message_text}</Typography>
      ))}

      <Button onClick={dialog.onTrue}>Add</Button>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>Добавить замечание</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialog.onFalse}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
