import { grey } from 'theme/palette';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fTime } from 'utils/format-time';

import { TaskMessage } from 'entities/task/model';

// -----------------------------------------------------------------------------------------------------------------

export type RemarkAlign = 'start' | 'end';

export interface RemarkProps {
  remark: TaskMessage;
  align?: RemarkAlign;
}

export function Remark({ remark, align = 'start' }: RemarkProps) {
  const self = align === 'end';

  const { message_by: author, message_date: date, message_text: text } = remark;

  return (
    <Stack
      spacing={1}
      alignItems="flex-end"
      alignSelf={self ? 'flex-ens' : 'flex-start'}
      direction={self ? 'row-reverse' : 'row'}
      sx={{ width: 1 }}
    >
      <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
        {author.last_name[0].toUpperCase()}
        {author.first_name[0].toUpperCase()}
      </Avatar>

      <Paper sx={{ maxWidth: '70%', p: 1 }} variant="outlined">
        <Typography variant="subtitle2" color={self ? 'primary' : 'secondary'}>
          {author.last_name} {author.first_name}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {text}
        </Typography>
      </Paper>

      <Typography variant="caption" color={grey['500']}>
        {fTime(date)}
      </Typography>
    </Stack>
  );
}
