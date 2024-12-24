import { UploadFile } from 'antd';

export interface AttachmentUUID {
  uuid: string;
}

export type UploadedAttachmentModel = UploadFile<AttachmentUUID>;

export type DetailedAttachmentModel = Partial<AttachmentUUID> & {
  url?: string;
  name?: string;
  size?: number;
  lastModified?: number;
};
