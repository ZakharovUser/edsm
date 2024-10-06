import { Form, Upload, UploadProps } from 'antd';
import { useRef, useState, useEffect } from 'react';
import FileThumbnail from 'components/file-thumbnail';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FolderIcon from '@mui/icons-material/Folder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListItemText from '@mui/material/ListItemText';
import { Theme, SxProps } from '@mui/material/styles';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import { fData } from 'utils/format-number';
import { fDateTime } from 'utils/format-time';
import { endpoints, httpClient } from 'utils/http-client';

import { Task } from 'entities/task/model';
import { useUpdateTask } from 'entities/task/api';
import { Attachment } from 'entities/attachments/model';
import { useAttachments } from 'entities/attachments/api';
import { formatFiles } from 'entities/regulation-tru/helpers';

import styles from './task-drawer.module.css';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  hidden: boolean;
  task: Task | undefined;
  loading?: boolean;
}

export function TaskDrawerAttachments({ hidden, task, loading }: Props) {
  const links = useAttachments(task?.documents);

  const updateTask = useUpdateTask();

  const hasAAttachments = task?.documents?.length !== 0;

  const onSave = (data: Pick<Task, 'documents'>) => {
    if (task) {
      updateTask.mutate({
        id: task.task_number,
        body: data,
      });
    }
  };

  if (loading) {
    return (
      <Box hidden={hidden}>
        <Box sx={{ mx: 'auto', width: 'max-content', p: 3 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!hasAAttachments) {
    return (
      <Box hidden={hidden}>
        <Stack
          sx={{
            mt: 5,
            color: (theme) => theme.palette.grey['400'],
          }}
        >
          <FolderIcon sx={{ width: 100, height: 100, alignSelf: 'center' }} />
          <Typography variant="subtitle2" textAlign="center" sx={{ mb: 2 }}>
            Файлов нет
          </Typography>

          <AttachmentsUpload onSave={onSave} />
        </Stack>
      </Box>
    );
  }

  return (
    <Box hidden={hidden}>
      <Stack spacing={1} sx={{ width: 1 }}>
        {links.map(({ data, isPending, isError }) => (
          <AttachmentView
            download
            data={data}
            key={data.uuid}
            error={isError}
            loading={isPending}
          />
        ))}

        <AttachmentsUpload onSave={onSave} />
      </Stack>
    </Box>
  );
}

function AttachmentView({
  sx,
  data,
  error,
  loading,
  deleted,
  download,
  onDelete,
}: {
  data: Attachment & { url: string | undefined };
  error?: boolean;
  loading?: boolean;
  deleted?: boolean;
  download?: boolean;
  sx?: SxProps<Theme>;
  onDelete?: VoidFunction;
}) {
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

function AttachmentsUpload({
  onSave,
  ...props
}: UploadProps & { onSave?(data: Pick<Task, 'documents'>): void }) {
  const [files, setFiles] = useState(0);

  const ref = useRef<any>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const element: HTMLSpanElement | undefined = ref?.current?.nativeElement;
    element?.classList.add(styles.upload);
  }, []);

  return (
    <Form form={form} onFinish={(values) => onSave?.(values)}>
      <Form.Item
        name="documents"
        valuePropName="fileList"
        getValueFromEvent={formatFiles}
        className={styles.label}
      >
        <Upload
          {...props}
          ref={ref}
          onChange={(info) => setFiles(info.fileList.length)}
          customRequest={async (options) => {
            const formData = new FormData();
            formData.append('file', options.file);

            httpClient
              .post(endpoints.attachment.new, formData)
              .then((res) => options.onSuccess?.(res.data))
              .catch((err) => options.onError?.(err));
          }}
          itemRender={(_node, file, _list, actions) => (
            <AttachmentView
              deleted
              onDelete={actions.remove}
              error={file.status === 'error'}
              loading={file.status === 'uploading'}
              data={{
                name: file.name,
                uuid: file.uid,
                size: file.size || 0,
                lastModified: file.lastModified || 0,
                url: file.name,
              }}
              sx={{
                mb: 1,
              }}
            />
          )}
        >
          <Stack
            sx={{
              p: 1,
              width: 1,
              border: '1px dashed currentColor',
              cursor: 'pointer',
              borderRadius: 1,
              transition: 'color .2s',
              color: (theme) => theme.palette.grey.A700,
              '&:hover': {
                color: 'primary.main',
              },
            }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <NoteAddIcon />
            <Typography variant="subtitle2">Добавить файлы</Typography>
          </Stack>
        </Upload>
      </Form.Item>

      {!!files && (
        <Button type="submit" fullWidth variant="contained" color="primary">
          Сохранить
        </Button>
      )}
    </Form>
  );
}
