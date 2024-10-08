import React from 'react';
import Label from 'components/label';

import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
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

import { TaskDrawerRow } from 'features/task/view-task/ui/task-drawer/task-drawer-row';

import { taskStatusMap } from 'entities/task/helpers';
import { Task, TaskReason, TaskImportance } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  task: Task | undefined;
  hidden: boolean;
  loading?: boolean;
}

const iconProps = { sx: { color: (theme: Theme) => theme.palette.grey['500'], fontSize: 18 } };

export function TaskDrawerSummary({ loading, task, hidden }: Props) {
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

      <TaskDrawerRow label="ID" loading={loading} icon={<NumbersIcon {...iconProps} />}>
        {task?.task_number}
      </TaskDrawerRow>

      <TaskDrawerRow label="Статус" loading={loading} icon={<StreamIcon {...iconProps} />}>
        <Label color={taskStatus?.color} startIcon={taskStatus?.icon}>
          {taskStatus?.label}
        </Label>
      </TaskDrawerRow>

      <TaskDrawerRow label="Этап" loading={loading} icon={<ShareLocationIcon {...iconProps} />}>
        {currentHistoryStep?.current_stage.stage_name}
      </TaskDrawerRow>

      <TaskDrawerRow label="Автор" loading={loading} icon={<PersonIcon {...iconProps} />}>
        {task && formatUserName(task.created_by)}
      </TaskDrawerRow>

      <TaskDrawerRow label="Учреждение" loading={loading} icon={<ApartmentIcon {...iconProps} />}>
        {task?.org_name.name_short}
      </TaskDrawerRow>

      <TaskDrawerRow label="Регламент" loading={loading} icon={<ContentPasteIcon {...iconProps} />}>
        {task?.route.name}
      </TaskDrawerRow>

      <TaskDrawerRow label="Важность" loading={loading} icon={<StarHalfIcon {...iconProps} />}>
        {task && TaskImportance[task.importance]}
      </TaskDrawerRow>

      <TaskDrawerRow label="Причина" loading={loading} icon={<ErrorOutlineIcon {...iconProps} />}>
        {task && TaskReason[task.reason]}
      </TaskDrawerRow>

      <TaskDrawerRow
        loading={loading}
        label="Источник финансирования"
        icon={<AccountBalanceWalletIcon {...iconProps} />}
      >
        {task?.finance_source.name}
      </TaskDrawerRow>

      <TaskDrawerRow label="Дата создания" loading={loading} icon={<CalendarMonthIcon {...iconProps} />}>
        {task && fDate(task.creation_date)}
      </TaskDrawerRow>

      <TaskDrawerRow label="Дата выполнения" loading={loading} icon={<CalendarMonthIcon {...iconProps} />}>
        {task?.deadline_date && fDate(task.deadline_date)}
      </TaskDrawerRow>
    </Box>
  );
}
