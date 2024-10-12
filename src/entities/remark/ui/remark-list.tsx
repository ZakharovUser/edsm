import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

import { fDate } from 'utils/format-time';

import { TaskMessage } from 'entities/task/model';
import { sortByDate } from 'entities/remark/helpers';

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
    <List sx={{ p: 0, position: 'relation', width: 1 }}>
      {sortByDate(remarks).map(([date, children]) => (
        <ListItem key={date} sx={{ p: 0 }}>
          <List sx={{ p: 0, width: 1 }}>
            <ListSubheader sx={{ bgcolor: 'transparent', textAlign: 'center' }}>
              <Typography
                variant="caption"
                sx={{ py: 0.5, px: 1.5, bgcolor: 'background.neutral', borderRadius: 1 }}
              >
                {fDate(date, 'dd MMMM yyyy г.')}
              </Typography>
            </ListSubheader>

            {children.map((remark) => (
              <ListItem key={remark.id} sx={{ px: 0 }}>
                <Remark remark={remark} align={alignRender?.(remark)} />
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
}
