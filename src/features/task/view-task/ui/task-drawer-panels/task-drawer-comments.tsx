import { useCallback } from 'react';
import { useAuthContext } from 'auth/hooks';

import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

import { RemarkList } from 'entities/remark/ui';
import { Task, TaskMessage } from 'entities/task/model';
import { useTaskPermissions } from 'entities/task/hooks';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerComments({ hidden, task, loading }: Props) {
  const { user } = useAuthContext();

  const { canResolveRemark: canResolve } = useTaskPermissions(task);

  const canRemove = useCallback(
    (remark: TaskMessage) => remark.message_by.id === user?.id,
    [user?.id]
  );

  return (
    <Box hidden={hidden}>
      {loading ? (
        <Box sx={{ mx: 'auto', width: 'max-content', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <RemarkList
          remarks={task?.messages}
          permissions={{ canResolve, canRemove }}
          alignRender={({ message_by }) => (user?.id === message_by.id ? 'end' : 'start')}
        />
      )}
    </Box>
  );
}
