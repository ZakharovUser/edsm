import { useAuthContext } from 'auth/hooks';

import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

import { Task } from 'entities/task/model';
import { RemarkList } from 'entities/remark/ui';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerComments({ hidden, task, loading }: Props) {
  const { user } = useAuthContext();

  return (
    <Box hidden={hidden}>
      {loading ? (
        <Box sx={{ mx: 'auto', width: 'max-content', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <RemarkList
          remarks={task?.messages}
          alignRender={({ message_by }) => (user?.id === message_by.id ? 'end' : 'start')}
        />
      )}
    </Box>
  );
}
