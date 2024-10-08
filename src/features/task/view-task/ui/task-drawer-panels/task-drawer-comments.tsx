import { useState } from 'react';
import { grey } from 'theme/palette';
import { useBoolean } from 'hooks/use-boolean';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography variant="subtitle2">{formatUserName(message_by)}</Typography>
              <Typography variant="caption" color={grey['500']}>
                #{id}
              </Typography>
            </Stack>

            <Typography variant="caption" color={grey['500']}>
              {fDateTime(message_date)}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {message_text}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Button onClick={dialog.onTrue}>Add</Button>

      <Dialog open={dialog.value} onClose={onClose}>
        <DialogTitle>Добавить замечание</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 400,
              pt: 2,
            }}
          >
            <TextField
              multiline
              fullWidth
              label="Замечание"
              rows={6}
              size="small"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
