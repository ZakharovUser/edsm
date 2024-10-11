import { grey } from 'theme/palette';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDateTime } from 'utils/format-time';
import { formatUserName } from 'utils/format-user-name';

import { UserModel } from 'entities/user/models';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  id: number | string;
  date: string;
  text: string;
  author: UserModel;
}

export function Remark({ id, author, text, date }: Props) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      sx={{
        p: 1,
        width: 1,
        borderRadius: 1,
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z4,
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle2">{formatUserName(author)}</Typography>
        <Typography variant="caption" color={grey['500']}>
          #{id}
        </Typography>
      </Stack>

      <Typography variant="caption" color={grey['500']}>
        {fDateTime(date)}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        {text}
      </Typography>
    </Stack>
  );
}
