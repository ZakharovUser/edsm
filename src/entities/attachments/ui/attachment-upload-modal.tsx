import { Form } from 'antd';
import { useBoolean } from 'hooks/use-boolean';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import { endpoints } from 'utils/http-client';

import { deleteAttachment } from 'entities/attachments/api';
import { UploadAttachmentModel } from 'entities/attachments/model';

import UploadFiles from 'shared/ui/upload-files';

// -----------------------------------------------------------------------------------------------------------------

type FormValues = {
  documents?: UploadAttachmentModel[];
};

export interface AttachmentUploadProps {
  onSave?(data: FormValues, onSuccess?: VoidFunction): void;
}

export default function AttachmentsUploadModal({ onSave }: AttachmentUploadProps) {
  const dialog = useBoolean();

  const [form] = Form.useForm<FormValues>();

  const onClose = () => {
    form.resetFields();
    dialog.onFalse();
  };

  return (
    <>
      <IconButton onClick={dialog.onTrue} size="small">
        <AddCircleOutlineRoundedIcon fontSize="small" />
      </IconButton>

      <Dialog open={dialog.value} onClose={onClose}>
        <DialogTitle>Добавление файлов</DialogTitle>
        <Form form={form} onFinish={(values) => onSave?.(values, onClose)}>
          <DialogContent>
            <Form.Item
              name="documents"
              valuePropName="fileList"
              getValueFromEvent={(event) => event.fileList}
            >
              <UploadFiles
                action={endpoints.attachment.new}
                onRemove={({ response }: UploadAttachmentModel) =>
                  response?.uuid ? deleteAttachment(response.uuid) : false
                }
              />
            </Form.Item>
          </DialogContent>
          <DialogActions>
            <Button type="reset" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">Добавить</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
}
