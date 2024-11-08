import { useCallback } from 'react';
import { grey } from 'theme/palette';
import { useMenu } from 'hooks/use-menu';

import { Menu } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import { fTime } from 'utils/format-time';

import { TaskMessage } from 'entities/task/model';
import { RemarkStatus } from 'entities/remark/ui/remark-status';

// -----------------------------------------------------------------------------------------------------------------

export interface RemarkProps {
  remark: TaskMessage;
  align?: 'start' | 'end';
  canResolve?: boolean;
  canRemove?: boolean;
  onReject?: VoidFunction;
  onDelete?: VoidFunction;
  onResolve?: VoidFunction;
}

export function Remark({
  remark,
  align = 'start',
  canRemove,
  canResolve,
  onDelete,
  onReject,
  onResolve,
}: RemarkProps) {
  const menu = useMenu();

  const actionWithClose = useCallback(
    (action?: VoidFunction) => () => {
      menu.onClose();
      action?.();
    },
    [menu]
  );

  const self = align === 'end';

  const { message_by: author, message_date: date, message_text: text } = remark;

  const canActions = !remark.status && (canRemove || canResolve);

  return (
    <Stack
      spacing={0.5}
      alignItems="flex-end"
      alignSelf={self ? 'flex-end' : 'flex-start'}
      direction={self ? 'row-reverse' : 'row'}
      sx={{ width: 1 }}
    >
      <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
        {author.last_name[0].toUpperCase()}
        {author.first_name[0].toUpperCase()}
      </Avatar>

      <Paper sx={{ maxWidth: '70%', p: 1 }} variant="outlined">
        <Stack spacing={1} alignItems="center" justifyContent="space-between" direction="row">
          <Stack alignItems={self ? 'flex-end' : 'flex-start'}>
            <RemarkStatus status={remark.status} />
            <Typography variant="subtitle2" color={self ? 'primary' : 'secondary'}>
              {author.last_name} {author.first_name}
            </Typography>
          </Stack>

          {canActions && (
            <IconButton size="small" onClick={menu.onOpen}>
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
          )}

          <Menu open={menu.open} anchorEl={menu.anchor} onClose={menu.onClose}>
            {canResolve && (
              <MenuItem onClick={actionWithClose(onResolve)}>
                <ThumbUpAltIcon sx={{ mr: 1, width: 16, height: 16 }} />
                Принять
              </MenuItem>
            )}
            {canResolve && (
              <MenuItem onClick={actionWithClose(onReject)}>
                <ThumbDownAltIcon sx={{ mr: 1, width: 16, height: 16 }} />
                Отклонить
              </MenuItem>
            )}
            {canRemove && (
              <MenuItem sx={{ color: 'error.main' }} onClick={actionWithClose(onDelete)}>
                <DeleteIcon sx={{ mr: 1, width: 16, height: 16 }} />
                Удалить
              </MenuItem>
            )}
          </Menu>
        </Stack>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {text}
        </Typography>
      </Paper>

      <Typography variant="caption" color={grey['500']} sx={{ mt: 'auto', fontSize: 12 }}>
        {fTime(date)}
      </Typography>
    </Stack>
  );
}
