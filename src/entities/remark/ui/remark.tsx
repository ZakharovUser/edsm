import { grey } from 'theme/palette';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fTime } from 'utils/format-time';

import { UserModel } from 'entities/user/models';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  date: string;
  text: string;
  author: UserModel;
  align?: 'start' | 'end';
}

export function Remark({ author, text, date, align = 'start' }: Props) {
  const self = align === 'end';

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
