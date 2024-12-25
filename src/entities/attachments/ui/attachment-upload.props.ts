import { UploadAttachmentModel } from 'entities/attachments/model';

export type FormValues = {
  documents: UploadAttachmentModel[];
};

export interface AttachmentUploadProps {
  onSave?(data: FormValues, onSuccess?: VoidFunction): void;
}
