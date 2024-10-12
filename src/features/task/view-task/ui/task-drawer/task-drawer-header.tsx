import React from 'react';

import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NotesIcon from '@mui/icons-material/Notes';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import TimelineIcon from '@mui/icons-material/Timeline';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { View } from 'features/task/view-task/models';
import { useViewContext } from 'features/task/view-task/hooks';

import { RemarkAdding } from 'entities/remark/ui';
import { AttachmentUpload } from 'entities/attachments/ui';
import { Task, TaskPermissions } from 'entities/task/model';
import { AttachmentModel } from 'entities/attachments/model';
import { useUpdateTask, useCreateTaskRemark } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

interface Props extends StackProps {
  taskId: string | null;
  onClose: VoidFunction;
  permissions: TaskPermissions;
  concatAttachments(attachments: AttachmentModel[]): AttachmentModel[];
}

export function TaskDrawerHeader({
  sx,
  taskId,
  onClose,
  permissions,
  concatAttachments,
  ...props
}: Props) {
  const theme = useTheme();

  const view = useViewContext();

  const updateTask = useUpdateTask();

  const createRemark = useCreateTaskRemark();

  const onSaveAttachments = (data: Pick<Task, 'documents'>, onSuccess?: VoidFunction) => {
    if (taskId) {
      updateTask.mutate(
        { taskId, body: { documents: concatAttachments(data.documents) } },
        { onSuccess: () => onSuccess?.() }
      );
    }
  };

  const onSaveRemark = ({ remark }: { remark: string }, onSuccess?: VoidFunction) => {
    if (taskId) {
      createRemark.mutate({ taskId, remark }, { onSuccess: () => onSuccess?.() });
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ borderBottom: `dashed 1px ${theme.palette.divider}`, py: 1, ...sx }}
      {...props}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={onClose} size="small">
          <KeyboardDoubleArrowRightIcon />
        </IconButton>

        <Typography variant="subtitle1">{view.value}</Typography>

        {view.isAttachments && <AttachmentUpload.Modal onSave={onSaveAttachments} />}

        {view.isComments && <RemarkAdding onSave={onSaveRemark} />}
      </Stack>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={view.value}
        sx={{ bgcolor: 'transparent' }}
        onChange={(_, value) => view.onChange(value)}
      >
        <ToggleButton value={View.Summary} sx={{ p: 0.5 }}>
          <NotesIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value={View.History} sx={{ p: 0.5 }}>
          <TimelineIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value={View.Comments} sx={{ p: 0.5 }}>
          <AnnouncementOutlinedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value={View.Attachments} sx={{ p: 0.5 }}>
          <AttachFileOutlinedIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
