import { UploadedAttachmentModel } from 'entities/attachments/model';

export type FormValues = {
  documents: UploadedAttachmentModel[];
};

export interface AttachmentUploadProps {
  onSave?(data: FormValues, onSuccess?: VoidFunction): void;
}
