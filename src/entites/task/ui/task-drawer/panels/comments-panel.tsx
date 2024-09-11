import { useState } from 'react';
import Scrollbar from 'components/scrollbar';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Task } from 'entites/task/model';
import { useCreateTaskComment } from 'entites/task/api';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  history: Task['task_history'] | undefined;
}

export function CommentsPanel({ hidden, history }: Props) {
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  // const comments = history?.map((step) => step.comments);

  const { mutate } = useCreateTaskComment();

  console.log(comments);

  const onAddComment = () => {
    setComments((prevComments) => [...prevComments, comment]);
    setComment('');
  };

  return (
    <Scrollbar hidden={hidden} sx={{ w: '100%' }}>
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
    </Scrollbar>
  );
}
