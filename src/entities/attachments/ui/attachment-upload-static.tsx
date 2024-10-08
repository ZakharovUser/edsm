import { Form, Upload, UploadProps } from 'antd';
import { useRef, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { endpoints, httpClient } from 'utils/http-client';

import { getValueFromEvent } from 'entities/attachments/helpers';

import { Attachment } from './attachment';
import styles from './attachment-upload.module.css';
import { FormValues, AttachmentUploadProps } from './attachment-upload.props';

// -----------------------------------------------------------------------------------------------------------------

type Props = UploadProps &
  AttachmentUploadProps & {
    positionFiles?: 'before' | 'after';
  };

export function AttachmentsUploadStatic({ onSave, positionFiles = 'before', ...props }: Props) {
  const [files, setFiles] = useState(0);

  const ref = useRef<any>(null);

  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    const element: HTMLSpanElement | undefined = ref?.current?.nativeElement;
    element?.classList.add(styles.upload, positionFiles === 'before' ? styles.reverse : '');

    // eslint-disable-next-line
  }, [ref.current, positionFiles]);

  const onSubmit = (values: FormValues) => {
    onSave?.(values, () => {
      form.resetFields();
      setFiles(0);
    });
  };

  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Item
        name="documents"
        valuePropName="fileList"
        getValueFromEvent={getValueFromEvent}
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
            <Attachment
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
