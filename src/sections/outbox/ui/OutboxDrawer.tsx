// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ru from 'date-fns/locale/ru';
import { ReactElement, cloneElement, PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LabelIcon from '@mui/icons-material/Label';
import NumbersIcon from '@mui/icons-material/Numbers';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { httpClient } from 'utils/axios';

import { useGetOutboxItem } from 'sections/outbox/hooks';

import { TaskReason, TaskImportance } from 'entites/task/model';
import { useFinancingSources } from 'entites/financing-source/hooks';

// -----------------------------------------------------------------------------------------------------------------

export interface Props extends Omit<DrawerProps, 'onClose'> {
  taskId: string | null;
  onClose: VoidFunction;
}

// -----------------------------------------------------------------------------------------------------------------

const lighten = {
  color: (theme: Theme) => theme.palette.grey['500'],
};

export async function getAttachmentLink(id: string) {
  return httpClient
    .get<{ attachment: string }>(`/api/edm/attachments/${id}`)
    .then((res) => res.data.attachment);
}

export function OutboxDrawer({ taskId, ...props }: Props) {
  const { data: task, isPending: isPendingTask } = useGetOutboxItem(taskId);

  const { data: financingSources, isPending: isPendingFinancingSources } =
    useFinancingSources<string>({
      select: (data) => data.find((source) => source.id === task?.finance_source)?.name,
      enabled: !!task?.finance_source,
    });

  // console.log(task);

  return (
    <Drawer
      anchor="right"
      hideBackdrop
      disableScrollLock
      disableRestoreFocus
      sx={{
        width: 0,
      }}
      PaperProps={{
        sx: {
          minWidth: 300,
        },
      }}
      {...props}
    >
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
          <IconButton onClick={props.onClose} size="small">
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Stack>

        <Typography variant="h4" sx={{ mb: 1 }}>
          {task && !isPendingTask ? task.short_name : <Skeleton />}
        </Typography>

        <Typography variant="body1" sx={{ ...lighten, maxWidth: '500px', mb: 4, fontSize: 14 }}>
          {task && !isPendingTask ? task.full_name : <Skeleton />}
        </Typography>

        <Stack gap={1.5}>
          <Row label="ID" isLoading={isPendingTask} icon={<NumbersIcon />}>
            {taskId}
          </Row>

          <Row label="Регламент" isLoading={isPendingTask} icon={<ContentPasteIcon />}>
            {task && task.route}
          </Row>

          <Row label="Важность" isLoading={isPendingTask} icon={<StarHalfIcon />}>
            {task && TaskImportance[task.importance]}
          </Row>

          <Row label="Причина" isLoading={isPendingTask} icon={<ErrorOutlineIcon />}>
            {task && TaskReason[task.reason]}
          </Row>

          <Row
            label="Источник финансирования"
            icon={<AccountBalanceWalletIcon />}
            isLoading={isPendingFinancingSources}
          >
            {financingSources}
          </Row>

          <Row label="Дата создания" isLoading={isPendingTask} icon={<CalendarMonthIcon />}>
            {task && format(new Date(task.creation_date), 'PPpp', { locale: ru })}
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
      </Box>
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