import { TaskView } from 'entites/task/ui/task-view';

import { useGetOutbox } from './hooks';

// ----------------------------------------------------------------------

export function OutboxView() {
  const { data, isLoading } = useGetOutbox();

  return <TaskView tasks={data || []} loading={isLoading} />;
}
