import { useAuthContext } from 'auth/hooks';
import Scrollbar from 'components/scrollbar';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { ReactElement, cloneElement, PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LabelIcon from '@mui/icons-material/Label';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import HistoryIcon from '@mui/icons-material/History';
import { Theme, useTheme } from '@mui/material/styles';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {
  Accordion,
  AccordionDetails,
  accordionClasses,
  AccordionSummary,
  accordionSummaryClasses,
} from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineContent,
  TimelineDotProps,
  TimelineConnector,
  TimelineSeparator,
} from '@mui/lab';

import { httpClient } from 'utils/axios';
import { fDate } from 'utils/format-time';
import { formatUserName } from 'utils/format-user-name';

import { getTaskItem } from 'entites/task/api';
import { TaskReason, TaskStatus, TaskImportance } from 'entites/task/model';

// -----------------------------------------------------------------------------------------------------------------

export type Props = Omit<DrawerProps, 'onClose' | 'open'>;

// -----------------------------------------------------------------------------------------------------------------

const lighten = {
  color: (theme: Theme) => theme.palette.grey['500'],
};

export async function getAttachmentLink(id: string) {
  return httpClient
    .get<{ attachment: string }>(`/api/edm/attachments/${id}`)
    .then((res) => res.data.attachment);
}

const taskStatusMap: Record<TaskStatus, TimelineDotProps['color']> = {
  [TaskStatus.New]: 'info',
  [TaskStatus.Draft]: 'grey',
  [TaskStatus.Canceled]: 'error',
  [TaskStatus.Completed]: 'success',
  [TaskStatus.Refinement]: 'warning',
  [TaskStatus.Progress]: 'secondary',
};

// -----------------------------------------------------------------------------------------------------------------

export function TaskDrawer(props: Props) {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get('task');

  const { data: task, isPending: isPendingTask } = useQuery({
    queryKey: ['task', taskId],
    queryFn: ({ queryKey }) => getTaskItem(queryKey[1] as string),
    enabled: !!taskId,
  });

  console.log(user);
  console.log(task?.task_history);

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
        <Box sx={{ flex: 0, borderBottom: `dashed 1px ${theme.palette.divider}`, py: 1 }}>
          <IconButton onClick={() => setSearchParams()} size="small">
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Box>

        <Scrollbar sx={{ flex: 1, py: 1 }}>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {task && !isPendingTask ? task.short_name : <Skeleton />}
          </Typography>

          <Typography variant="body1" sx={{ ...lighten, maxWidth: '500px', mb: 3, fontSize: 14 }}>
            {task && !isPendingTask ? task.full_name : <Skeleton />}
          </Typography>

          <Stack gap={1.5}>
            <Row label="ID" isLoading={isPendingTask} icon={<NumbersIcon />}>
              {taskId}
            </Row>

            <Row label="Автор" isLoading={isPendingTask} icon={<PersonIcon />}>
              {task && formatUserName(task.created_by)}
            </Row>

            <Row label="Учреждение" isLoading={isPendingTask} icon={<ApartmentIcon />}>
              {task?.org_name.name_short}
            </Row>

            <Row label="Регламент" isLoading={isPendingTask} icon={<ContentPasteIcon />}>
              {task?.route.name}
            </Row>

            <Row label="Важность" isLoading={isPendingTask} icon={<StarHalfIcon />}>
              {task && TaskImportance[task.importance]}
            </Row>

            <Row label="Причина" isLoading={isPendingTask} icon={<ErrorOutlineIcon />}>
              {task && TaskReason[task.reason]}
            </Row>

            <Row
              isLoading={isPendingTask}
              label="Источник финансирования"
              icon={<AccountBalanceWalletIcon />}
            >
              {task?.finance_source.name}
            </Row>

            <Row label="Дата создания" isLoading={isPendingTask} icon={<CalendarMonthIcon />}>
              {task && fDate(task.creation_date)}
            </Row>

            <Row label="Дата выполнения" isLoading={isPendingTask} icon={<CalendarMonthIcon />}>
              {task?.deadline_date && fDate(task.deadline_date)}
            </Row>

            <Row label="Документы" isLoading={isPendingTask} icon={<AttachFileIcon />}>
              {task &&
                task.documents.length > 0 &&
                task.documents.map((attach) => (
                  <a href={`/api/edm/attachments/${attach.uuid}`} key={attach.uuid} download>
                    {attach.name} ({(attach.size / (8 * 1024)).toFixed(2)} Кб)
                  </a>
                ))}
            </Row>
          </Stack>

          <Box sx={{ p: 1, mt: 1.5 }}>
            <Accordion
              slotProps={{ transition: { unmountOnExit: true } }}
              sx={{
                [`&:not(:has(.${accordionClasses.expanded}))`]: {
                  boxShadow: '0 8px 16px 0 rgba(145, 158, 171, 0.16)',
                },
              }}
            >
              <AccordionSummary
                sx={{
                  [`& .${accordionSummaryClasses.content}`]: { justifyContent: 'center' },
                }}
                expandIcon={<ExpandMoreIcon sx={{ ...lighten, fontSize: 18 }} />}
              >
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <HistoryIcon sx={{ ...lighten, fontSize: 18 }} />
                  <Typography sx={{ ...lighten, fontSize: 14 }} noWrap>
                    История
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {task && task.task_history.length && (
                  <Timeline
                    sx={{
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                    }}
                  >
                    {task.task_history.map((step, idx, arr) => {
                      const last = idx === arr.length - 1;

                      return (
                        <TimelineItem key={step.timestamp}>
                          <TimelineSeparator>
                            <TimelineDot
                              variant="outlined"
                              color={taskStatusMap[step.task_status]}
                            />
                            {!last && (
                              <TimelineConnector
                                sx={{ bgcolor: `${taskStatusMap[step.task_status]}.main` }}
                              />
                            )}
                          </TimelineSeparator>
                          <TimelineContent>{step.timestamp}</TimelineContent>
                        </TimelineItem>
                      );
                    })}
                  </Timeline>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Scrollbar>

        <Stack sx={{ flex: 0, py: 1, borderTop: `dashed 1px ${theme.palette.divider}` }}>
          <Button>Принять</Button>
          <Button>Согласовать</Button>
          <Button>Отклонить</Button>
          <Button>Прекратить</Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

interface RowProps extends PropsWithChildren {
  label: string;
  icon?: ReactElement;
  isLoading?: boolean;
}

function Row({ label, isLoading, children, icon }: RowProps) {
  if (!children && !isLoading) return null;

  const iconProps = { sx: { ...lighten, fontSize: 18 } };

  const Icon = icon ? cloneElement(icon, iconProps) : <LabelIcon {...iconProps} />;

  const Content =
    typeof children === 'string' ? (
      <Typography sx={{ flex: 1, fontSize: 14 }}>{isLoading ? <Skeleton /> : children}</Typography>
    ) : (
      <Box sx={{ flex: 1, fontSize: 14 }}>{isLoading ? <Skeleton /> : children}</Box>
    );

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Stack direction="row" alignItems="center" gap={0.5} sx={{ width: 150 }}>
        {Icon}
        <Typography sx={{ ...lighten, fontSize: 14 }} noWrap>
          {label}
        </Typography>
      </Stack>
      {Content}
    </Stack>
  );
}
