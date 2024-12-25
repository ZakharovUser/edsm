import { toast } from 'sonner';
import Label from 'components/label';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import StreamIcon from '@mui/icons-material/Stream';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { fDate } from 'utils/format-time';
import { formatUserName } from 'utils/format-user-name';

import { taskStatusMap } from 'entities/task/helpers';
import { TaskDeadlineExtend } from 'entities/task/ui';
import { useTaskPermissions } from 'entities/task/hooks';
import { useTaskDeadlineExtend } from 'entities/task/api';
import { Task, TaskReason, TaskImportance, TaskDeadlineExtendValues } from 'entities/task/model';

import { HttpClientError } from 'shared/api/types';

import { TaskDrawerSummaryRow } from './task-drawer-summary-row';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  task: Task | undefined;
  hidden: boolean;
  loading?: boolean;
}

export function TaskDrawerSummary({ loading, task, hidden }: Props) {
  const { canAddRequest } = useTaskPermissions(task);

  const deadlineExtend = useTaskDeadlineExtend();

  const deadlineExtendSubmit = async (values: TaskDeadlineExtendValues) => {
    const promise = deadlineExtend.mutateAsync({ taskId: task?.task_number, values });

    toast.promise(promise, {
      loading: 'Создание запроса',
      success: 'Запрос создан',
      error: (error: HttpClientError) => error.response?.data.detail || 'Ошибка создания запроса',
    });
  };

  const currentHistoryStep = task?.task_history.at(0);

  const taskStatus = currentHistoryStep && taskStatusMap[currentHistoryStep.task_status];

  return (
    <Box hidden={hidden}>
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        {loading ? <Skeleton /> : task?.short_name}
      </Typography>

      <Typography variant="body2" sx={{ color: ({ palette }) => palette.grey['500'], mb: 2 }}>
        {loading ? <Skeleton /> : task?.full_name}
      </Typography>

      <TaskDrawerSummaryRow label="ID" loading={loading} icon={<NumbersIcon />}>
        {task?.task_number}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Статус" loading={loading} icon={<StreamIcon />}>
        <Label color={taskStatus?.color} startIcon={taskStatus?.icon}>
          {taskStatus?.label}
        </Label>
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Этап" loading={loading} icon={<ShareLocationIcon />}>
        {currentHistoryStep?.current_stage.stage_name}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Автор" loading={loading} icon={<PersonIcon />}>
        {task && formatUserName(task.created_by)}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Исполнитель" loading={loading} icon={<PersonIcon />}>
        {task && currentHistoryStep && formatUserName(currentHistoryStep.executor)}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Учреждение" loading={loading} icon={<ApartmentIcon />}>
        {task?.org_name.name_short}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Регламент" loading={loading} icon={<ContentPasteIcon />}>
        {task?.route.name}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Важность" loading={loading} icon={<StarHalfIcon />}>
        {task && TaskImportance[task.importance]}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Причина" loading={loading} icon={<ErrorOutlineIcon />}>
        {task && TaskReason[task.reason]}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow
        loading={loading}
        label="Источник финансирования"
        icon={<AccountBalanceWalletIcon />}
      >
        {task?.finance_source.name}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Дата создания" loading={loading} icon={<CalendarMonthIcon />}>
        {task && fDate(task.creation_date)}
      </TaskDrawerSummaryRow>

      <TaskDrawerSummaryRow label="Дата выполнения" loading={loading} icon={<CalendarMonthIcon />}>
        {task?.deadline_date && (
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Typography fontSize="inherit">{fDate(task.deadline_date)}</Typography>

            {canAddRequest && (
              <TaskDeadlineExtend
                value={task.deadline_date}
                error={deadlineExtend.error}
                loading={deadlineExtend.isPending}
                onSubmit={deadlineExtendSubmit}
                onReset={deadlineExtend.reset}
              />
            )}
          </Stack>
        )}
      </TaskDrawerSummaryRow>
    </Box>
  );
}
