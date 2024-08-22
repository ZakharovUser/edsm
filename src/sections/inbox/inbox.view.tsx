import { TaskView } from 'entites/task/ui/task-view';

import { useGetInbox } from './hooks';

// ----------------------------------------------------------------------

export default function InboxView() {
  const { data, isLoading } = useGetInbox();

  return <TaskView tasks={data || []} loading={isLoading} />;
}
