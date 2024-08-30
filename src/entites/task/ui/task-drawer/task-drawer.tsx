import React, { useState } from 'react';
import Scrollbar from 'components/scrollbar';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import StreamIcon from '@mui/icons-material/Stream';
import NumbersIcon from '@mui/icons-material/Numbers';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  Timeline,
  TimelineDot,
  TimelineContent,
  TimelineDotProps,
  TimelineConnector,
  TimelineSeparator,
  TimelineOppositeContent,
} from '@mui/lab';

import { fDate } from 'utils/format-time';
import { formatUserName } from 'utils/format-user-name';

import { useTask, useTaskRights } from 'entites/task/hooks';
import { TaskReason, TaskStatus, TaskImportance } from 'entites/task/model';

import { Row } from './task-drawer-row';
import { TaskDrawerActions } from './task-drawer-actions';
import { View, TaskDrawerHeader } from './task-drawer-header';

// -----------------------------------------------------------------------------------------------------------------

export type Props = Omit<DrawerProps, 'onClose' | 'open'>;

// export async function getAttachmentLink(id: string) {
//   return httpClient
//     .get<{ attachment: string }>(`/api/edm/attachments/${id}`)
//     .then((res) => res.data.attachment);
// }

type StatusOption = {
  label: string;
  color: TimelineDotProps['color'];
};

const statusOptions: Record<TaskStatus, StatusOption> = {
  [TaskStatus.New]: { color: 'info', label: 'Новая' },
  [TaskStatus.Draft]: { color: 'grey', label: 'Черновик' },
  [TaskStatus.Canceled]: { color: 'error', label: 'Отменена' },
  [TaskStatus.Completed]: { color: 'success', label: 'Завершена' },
  [TaskStatus.Refinement]: { color: 'warning', label: 'На доработке' },
  [TaskStatus.Progress]: { color: 'secondary', label: 'В работе' },
};

const lighten = {
  color: (theme: Theme) => theme.palette.grey['500'],
};

const iconProps = { sx: { ...lighten, fontSize: 18 } };

// -----------------------------------------------------------------------------------------------------------------

export function TaskDrawer(props: Props) {
  const [view, setView] = useState<View>(View.Summary);
  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get('task');

  const { data: task, isPending: isPendingTask } = useTask(taskId);
  const { canAccept, canApprove } = useTaskRights(task);

  const currentHistoryStep = task?.task_history.at(-1);

  return (
    <Drawer
      open={!!taskId}
      onClose={() => setSearchParams()}
      anchor="right"
      hideBackdrop
      disableScrollLock
      disableRestoreFocus
      sx={{
        width: 0,
      }}
      PaperProps={{
        sx: {
          minWidth: 400,
        },
      }}
      {...props}
    >
      <Stack direction="column" sx={{ height: '100%', px: 1 }}>
        <TaskDrawerHeader
          view={view}
          sx={{ flex: 0 }}
          onChangeView={setView}
          onClose={setSearchParams}
        />

        <Scrollbar sx={{ flex: 1, py: 1 }}>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {task && !isPendingTask ? task.short_name : <Skeleton />}
          </Typography>

          <Typography variant="body1" sx={{ ...lighten, maxWidth: '500px', mb: 3, fontSize: 14 }}>
            {task && !isPendingTask ? task.full_name : <Skeleton />}
          </Typography>

          <Box hidden={view !== View.Summary}>
            <Row label="ID" loading={isPendingTask} icon={<NumbersIcon {...iconProps} />}>
              {taskId}
            </Row>

            <Row label="Статус" loading={isPendingTask} icon={<StreamIcon {...iconProps} />}>
              {currentHistoryStep && statusOptions[currentHistoryStep.task_status].label}
            </Row>

            <Row label="Автор" loading={isPendingTask} icon={<PersonIcon {...iconProps} />}>
              {task && formatUserName(task.created_by)}
            </Row>

            <Row label="Учреждение" loading={isPendingTask} icon={<ApartmentIcon {...iconProps} />}>
              {task?.org_name.name_short}
            </Row>

            <Row
              label="Регламент"
              loading={isPendingTask}
              icon={<ContentPasteIcon {...iconProps} />}
            >
              {task?.route.name}
            </Row>

            <Row label="Важность" loading={isPendingTask} icon={<StarHalfIcon {...iconProps} />}>
              {task && TaskImportance[task.importance]}
            </Row>

            <Row label="Причина" loading={isPendingTask} icon={<ErrorOutlineIcon {...iconProps} />}>
              {task && TaskReason[task.reason]}
            </Row>

            <Row
              loading={isPendingTask}
              label="Источник финансирования"
              icon={<AccountBalanceWalletIcon {...iconProps} />}
            >
              {task?.finance_source.name}
            </Row>

            <Row
              label="Дата создания"
              loading={isPendingTask}
              icon={<CalendarMonthIcon {...iconProps} />}
            >
              {task && fDate(task.creation_date)}
            </Row>

            <Row
              label="Дата выполнения"
              loading={isPendingTask}
              icon={<CalendarMonthIcon {...iconProps} />}
            >
              {task?.deadline_date && fDate(task.deadline_date)}
            </Row>

            <Row label="Документы" loading={isPendingTask} icon={<AttachFileIcon {...iconProps} />}>
              {task &&
                task.documents.length > 0 &&
                task.documents.map((attach) => (
                  <a href={`/api/edm/attachments/${attach.uuid}`} key={attach.uuid} download>
                    {attach.name} ({(attach.size / (8 * 1024)).toFixed(2)} Кб)
                  </a>
                ))}
            </Row>
          </Box>

          <Box hidden={view !== View.History}>
            {task && (
              <Timeline
                sx={{
                  m: 0,
                  p: 0,
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                }}
              >
                {task.task_history.map((step, idx, arr) => (
                  <TimelineItem key={step.timestamp}>
                    <TimelineOppositeContent
                      sx={{ m: 'auto 0' }}
                      align="right"
                      variant="body2"
                      color="text.secondary"
                    >
                      <div>{fDate(step.timestamp)}</div>
                      <div>{fDate(step.timestamp, 'hh:mm:ss')}</div>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        variant="outlined"
                        color={statusOptions[step.task_status].color}
                      />
                      {idx !== arr.length - 1 && (
                        <TimelineConnector
                          sx={{ bgcolor: `${statusOptions[step.task_status]}.main` }}
                        />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2">{step.current_stage.stage_name}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
          </Box>
        </Scrollbar>

        <TaskDrawerActions sx={{ flex: 0, py: 1 }} canAccept={canAccept} canApprove={canApprove} />
      </Stack>
    </Drawer>
  );
}
