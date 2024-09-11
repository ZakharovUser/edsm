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

import { Task, TaskReason, TaskImportance } from 'entites/task/model';

import { PanelRow } from './panel-row';
import { statusOptions } from './status-options';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  task: Task | undefined;
  hidden: boolean;
  loading?: boolean;
  iconProps?: SvgIconProps;
}

export function SummaryPanel({ loading, task, hidden, iconProps }: Props) {
  const currentHistoryStep = task?.task_history.at(-1);

  return (
    <Box hidden={hidden}>
      <PanelRow label="ID" loading={loading} icon={<NumbersIcon {...iconProps} />}>
        {task?.task_number}
      </PanelRow>

      <PanelRow label="Статус" loading={loading} icon={<StreamIcon {...iconProps} />}>
        {currentHistoryStep && statusOptions[currentHistoryStep.task_status].label}
      </PanelRow>

      <PanelRow label="Автор" loading={loading} icon={<PersonIcon {...iconProps} />}>
        {task && formatUserName(task.created_by)}
      </PanelRow>

      <PanelRow label="Учреждение" loading={loading} icon={<ApartmentIcon {...iconProps} />}>
        {task?.org_name.name_short}
      </PanelRow>

      <PanelRow label="Регламент" loading={loading} icon={<ContentPasteIcon {...iconProps} />}>
        {task?.route.name}
      </PanelRow>

      <PanelRow label="Важность" loading={loading} icon={<StarHalfIcon {...iconProps} />}>
        {task && TaskImportance[task.importance]}
      </PanelRow>

      <PanelRow label="Причина" loading={loading} icon={<ErrorOutlineIcon {...iconProps} />}>
        {task && TaskReason[task.reason]}
      </PanelRow>

      <PanelRow
        loading={loading}
        label="Источник финансирования"
        icon={<AccountBalanceWalletIcon {...iconProps} />}
      >
        {task?.finance_source.name}
      </PanelRow>

      <PanelRow label="Дата создания" loading={loading} icon={<CalendarMonthIcon {...iconProps} />}>
        {task && fDate(task.creation_date)}
      </PanelRow>

      <PanelRow
        label="Дата выполнения"
        loading={loading}
        icon={<CalendarMonthIcon {...iconProps} />}
      >
        {task?.deadline_date && fDate(task.deadline_date)}
      </PanelRow>

      <PanelRow label="Документы" loading={loading} icon={<AttachFileIcon {...iconProps} />}>
        {task &&
          task.documents.length > 0 &&
          task.documents.map((attach) => (
            <a href={`/api/edm/attachments/${attach.uuid}`} key={attach.uuid} download>
              {attach.name} ({(attach.size / (8 * 1024)).toFixed(2)} Кб)
            </a>
          ))}
      </PanelRow>
    </Box>
  );
}
