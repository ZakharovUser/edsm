import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Task } from 'entities/task/model';

// import { useCreateTaskComment } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  history: Task['task_history'] | undefined;
}

export function TaskDrawerComments({ hidden, history: _h }: Props) {
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  // const comments = history?.map((step) => step.comments);

  // const { mutate } = useCreateTaskComment();

  const onAddComment = () => {
    setComments((prevComments) => [...prevComments, comment]);
    setComment('');
  };

  return (
    <Box hidden={hidden}>
      <Box sx={{ mb: 2 }}>
        {comments.map((text, idx) => (
          <Box component="pre" sx={{ whiteSpace: 'pre-wrap' }} key={idx}>
            {text}
          </Box>
        ))}
      </Box>

      <TextField
        multiline
        fullWidth
        label="Замечание"
        size="small"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <Button type="button" sx={{ mt: 1 }} fullWidth onClick={onAddComment}>
        Добавить
      </Button>
    </Box>
  );
}
