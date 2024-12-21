import { useCallback } from 'react';
import Label from 'components/label';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Card, ListItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { fDate, fDateTime } from 'utils/format-time';
import { formatUserName } from 'utils/format-user-name';

import { TaskRequest } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDrawerRequestItemProps {
  request: TaskRequest;
  canDelete?: boolean;
  canResolve?: boolean;
  deleteLoading?: boolean;
  rejectLoading?: boolean;
  approveLoading?: boolean;
  onReject?(request: string): void;
  onDelete?(request: string): void;
  onApprove?(request: string): void;
}

export function TaskDrawerRequestItem({
  request,
  onDelete,
  onReject,
  onApprove,
  rejectLoading = false,
  deleteLoading = false,
  approveLoading = false,
  canDelete = false,
  canResolve = false,
}: TaskDrawerRequestItemProps) {
  const deleteHandler = useCallback(
    () => onDelete?.(request.id.toString()),
    [request.id, onDelete]
  );

  const rejectHandler = useCallback(
    () => onReject?.(request.id.toString()),
    [request.id, onReject]
  );

  const approveHandler = useCallback(
    () => onApprove?.(request.id.toString()),
    [request.id, onApprove]
  );

  const createdBy = formatUserName(request.requested_by);
  const createdAt = fDateTime(request.created_at);

  const isViewActions = (canResolve || canDelete) && request.status === 'pending';

  return (
    <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', p: 0 }}>
      <Card sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" sx={{ width: 1, p: 2 }}>
          <ListItemAvatar>
            <Avatar sx={{ width: 30, height: 30 }} />
          </ListItemAvatar>
          <ListItemText
            primary={createdBy}
            secondary={createdAt}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
          <Label sx={{ alignSelf: 'flex-start', ml: 'auto' }}>{request.status}</Label>
        </Stack>

        <Box sx={{ p: 2 }}>
          <ListItemText primary="Новая дата выполнения" secondary={fDate(request.new_deadline)} />
          <ListItemText primary="Причина" secondary={request.reason} sx={{ mt: 2 }} />
        </Box>

        {isViewActions && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" sx={{ width: 1, p: 2 }} gap={1}>
              {canDelete && (
                <LoadingButton
                  fullWidth
                  size="small"
                  color="error"
                  variant="soft"
                  onClick={deleteHandler}
                  loading={deleteLoading}
                  disabled={approveLoading || rejectLoading}
                >
                  Удалить
                </LoadingButton>
              )}

              {canResolve && (
                <LoadingButton
                  fullWidth
                  size="small"
                  color="error"
                  variant="soft"
                  onClick={rejectHandler}
                  loading={rejectLoading}
                  disabled={approveLoading || deleteLoading}
                >
                  Отменить
                </LoadingButton>
              )}

              {canResolve && (
                <LoadingButton
                  fullWidth
                  size="small"
                  variant="contained"
                  onClick={approveHandler}
                  loading={approveLoading}
                  disabled={deleteLoading || rejectLoading}
                >
                  Принять
                </LoadingButton>
              )}
            </Stack>
          </>
        )}
      </Card>
    </ListItem>
  );
}
