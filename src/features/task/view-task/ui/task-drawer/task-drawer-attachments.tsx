import FileThumbnail from 'components/file-thumbnail';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import { fData } from 'utils/format-number';
import { fDateTime } from 'utils/format-time';

import { Task } from 'entities/task/model';
import { useAttachments } from 'entities/attachments/api';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  attachments: Task['documents'] | undefined;
  loading?: boolean;
}

export function TaskDrawerAttachments({ hidden, attachments, loading }: Props) {
  const links = useAttachments(attachments);

  return (
    <Box hidden={hidden}>
      {loading && (
        <Box sx={{ mx: 'auto', width: 'max-content', p: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!attachments?.length && !loading && (
        <Stack
          alignItems="center"
          sx={{
            mt: 5,
            color: (theme) => theme.palette.grey['400'],
          }}
        >
          <FolderIcon sx={{ width: 100, height: 100 }} />
          <Typography variant="subtitle2" textAlign="center">
            Файлов нет
          </Typography>
        </Stack>
      )}

      {links.map(({ data, isPending }) => (
        <Stack
          key={data.uuid}
          component={Paper}
          direction="row"
          alignItems="center"
          variant="outlined"
          spacing={1}
          sx={{
            p: 1,
            mb: 1,
            borderRadius: 1,
            position: 'relative',
            '&:hover': {
              bgcolor: 'background.paper',
              boxShadow: (theme) => theme.customShadows.z4,
            },
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
          <LoadingButton
            download
            loading={isPending}
            component={Link}
            href={data.url}
            sx={{ width: 30, height: 30, minWidth: 0 }}
          >
            <DownloadRoundedIcon fontSize="small" />
          </LoadingButton>
        </Stack>
      ))}
    </Box>
  );
}
