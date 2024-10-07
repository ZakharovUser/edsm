import { Form } from 'antd';
import { useBoolean } from 'hooks/use-boolean';
import UploadFiles from 'components/upload-files';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import { endpoints } from 'utils/http-client';

import { AttachmentModel } from 'entities/attachments/model';
import { getValueFromEvent } from 'entities/attachments/helpers';

// -----------------------------------------------------------------------------------------------------------------

type FormValues = {
  documents: AttachmentModel[];
};

interface Props {
  onSave?(data: FormValues, onSuccess?: VoidFunction): void;
}

export function AttachmentsUploadModal({ onSave }: Props) {
  const dialog = useBoolean();

  const [form] = Form.useForm();

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
              getValueFromEvent={getValueFromEvent}
            >
              <UploadFiles action={endpoints.attachment.new} />
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
