import React from 'react';

import Box from '@mui/material/Box';
import StreamIcon from '@mui/icons-material/Stream';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIconProps } from '@mui/material/SvgIcon';
import NumbersIcon from '@mui/icons-material/Numbers';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { fDate } from 'utils/format-time';
import { formatUserName } from 'utils/format-user-name';

import { taskStatusOptions } from 'features/task/view-task/helpers';

import { Task, TaskReason, TaskImportance } from 'entities/task/model';

import { TaskDrawerRow } from './task-drawer-row';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  task: Task | undefined;
  hidden: boolean;
  loading?: boolean;
  iconProps?: SvgIconProps;
}

export function TaskDrawerSummary({ loading, task, hidden, iconProps }: Props) {
  const currentHistoryStep = task?.task_history.at(-1);

  return (
    <Box hidden={hidden}>
      <TaskDrawerRow label="ID" loading={loading} icon={<NumbersIcon {...iconProps} />}>
        {task?.task_number}
      </TaskDrawerRow>

      <TaskDrawerRow label="Статус" loading={loading} icon={<StreamIcon {...iconProps} />}>
        {currentHistoryStep && taskStatusOptions[currentHistoryStep.task_status].label}
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

      <TaskDrawerRow
        label="Дата создания"
        loading={loading}
        icon={<CalendarMonthIcon {...iconProps} />}
      >
        {task && fDate(task.creation_date)}
      </TaskDrawerRow>

      <TaskDrawerRow
        label="Дата выполнения"
        loading={loading}
        icon={<CalendarMonthIcon {...iconProps} />}
      >
        {task?.deadline_date && fDate(task.deadline_date)}
      </TaskDrawerRow>

      <TaskDrawerRow label="Документы" loading={loading} icon={<AttachFileIcon {...iconProps} />}>
        {task &&
          task.documents.length > 0 &&
          task.documents.map((attach) => (
            <a href={`/api/edm/attachments/${attach.uuid}`} key={attach.uuid} download>
              {attach.name} ({(attach.size / (8 * 1024)).toFixed(2)} Кб)
            </a>
          ))}
      </TaskDrawerRow>
    </Box>
  );
}
