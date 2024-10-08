import { AttachmentModel } from 'entities/attachments/model';

export type FormValues = {
  documents: AttachmentModel[];
};

export interface AttachmentUploadProps {
  onSave?(data: FormValues, onSuccess?: VoidFunction): void;
}
