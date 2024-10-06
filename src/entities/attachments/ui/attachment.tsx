import FileThumbnail from 'components/file-thumbnail';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Theme, SxProps } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import { fData } from 'utils/format-number';
import { fDateTime } from 'utils/format-time';

import { AttachmentModel } from '../model';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  data: AttachmentModel & { url: string | undefined };
  error?: boolean;
  loading?: boolean;
  deleted?: boolean;
  download?: boolean;
  sx?: SxProps<Theme>;
  onDelete?: VoidFunction;
};

export function Attachment({ sx, data, error, loading, deleted, download, onDelete }: Props) {
  return (
    <Stack
      component={Paper}
      direction="row"
      alignItems="center"
      variant="outlined"
      spacing={1}
      sx={{
        p: 1,
        width: 1,
        borderRadius: 1,
        borderColor: error ? 'error.main' : '',
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z4,
        },
        ...sx,
      }}
    >
      <FileThumbnail file={data.url} />

      <ListItemText
        primary={data.name}
        secondary={fDateTime(data.lastModified)}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
          display: 'inline-flex',
        }}
      />

      <Typography variant="caption">{fData(data.size)}</Typography>

      {download && (
        <LoadingButton
          download
          loading={loading}
          component={Link}
          href={data.url}
          sx={{ width: 30, height: 30, minWidth: 0 }}
        >
          <DownloadRoundedIcon fontSize="small" />
        </LoadingButton>
      )}

      {deleted && (
        <LoadingButton
          color="error"
          loading={loading}
          onClick={onDelete}
          sx={{ width: 30, height: 30, minWidth: 0 }}
        >
          <DeleteRoundedIcon fontSize="small" />
        </LoadingButton>
      )}

      {!download && !deleted && (
        <Box sx={{ width: 30, height: 30, overflow: 'hidden', p: 1 }}>
          {loading && <CircularProgress size={14} color="inherit" />}
        </Box>
      )}
    </Stack>
  );
}
