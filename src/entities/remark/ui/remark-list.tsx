import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

import { TaskMessage } from 'entities/task/model';

import { Remark, RemarkAlign } from './remark';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  remarks: Array<TaskMessage> | undefined;
  alignRender?(remark: TaskMessage): RemarkAlign;
}

export function RemarkList({ remarks, alignRender }: Props) {
  const hasRemarks = remarks && remarks.length !== 0;

  if (!hasRemarks) {
    return (
      <Stack
        sx={{
          mt: 5,
          color: (theme) => theme.palette.grey['400'],
        }}
      >
        <MarkUnreadChatAltIcon sx={{ width: 100, height: 100, alignSelf: 'center' }} />
        <Typography variant="subtitle2" textAlign="center" sx={{ mb: 2 }}>
          Замечаний нет
        </Typography>
      </Stack>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {remarks?.map((remark) => (
        <ListItem key={remark.id} sx={{ px: 0 }}>
          <Remark remark={remark} align={alignRender?.(remark)} />
        </ListItem>
      ))}
    </List>
  );
}
