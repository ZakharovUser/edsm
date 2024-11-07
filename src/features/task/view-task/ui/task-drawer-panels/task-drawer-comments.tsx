import { useAuthContext } from 'auth/hooks';

import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

import { fDate } from 'utils/format-time';

import { Task } from 'entities/task/model';
import { sortByDate } from 'entities/remark/helpers';
import { useTaskPermissions } from 'entities/task/hooks';
import { Remark, RemarkList, RemarkListItem } from 'entities/remark/ui';
import {
  useRemarkDeleteQuery,
  useRemarkRejectQuery,
  useRemarkApproveQuery,
} from 'entities/remark/api';

import { TaskDrawerPanel } from './task-drawer-panel';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerComments({ hidden, task, loading }: Props) {
  const { user } = useAuthContext();

  const { canResolveRemark } = useTaskPermissions(task);

  const remarkDeleteQuery = useRemarkDeleteQuery();
  const remarkRejectQuery = useRemarkRejectQuery();
  const remarkApproveQuery = useRemarkApproveQuery();

  const noRemarks = task?.messages.length === 0;

  return (
    <TaskDrawerPanel
      hidden={hidden}
      loading={loading}
      empty={noRemarks}
      emptyText="Замечаний нет"
      emptyIcon={MarkUnreadChatAltIcon}
    >
      {task &&
        sortByDate(task?.messages).map(([date, children]) => (
          <RemarkList key={date} subheader={fDate(date, 'dd MMMM yyyy г.')}>
            {children.map((remark) => {
              const canRemoveRemark = remark.message_by.id === user?.id;

              const align = canRemoveRemark ? 'end' : 'start';

              const params = { task: task?.task_number, remark: remark.id };

              return (
                <RemarkListItem key={remark.id}>
                  <Remark
                    align={align}
                    remark={remark}
                    canRemove={canRemoveRemark}
                    canResolve={canResolveRemark}
                    onDelete={() => remarkDeleteQuery.mutate(params)}
                    onReject={() => remarkRejectQuery.mutate(params)}
                    onResolve={() => remarkApproveQuery.mutate(params)}
                  />
                </RemarkListItem>
              );
            })}
          </RemarkList>
        ))}
    </TaskDrawerPanel>
  );
}
