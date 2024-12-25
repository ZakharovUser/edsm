import { UploadFile } from 'antd';

export interface AttachmentUUID {
  uuid: string;
}

export type UploadAttachmentModel = UploadFile<AttachmentUUID>;

export type AttachmentModel = {
  uid: string;
  uuid: string;
  name: string;
  url?: string;
  size?: number;
  lastModified?: number;
};
