import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

import { UploadAttachmentModel } from 'entities/attachments/model';

export function formatFiles(event: UploadChangeParam<UploadFile<UploadAttachmentModel>>) {
  return event.fileList.map(({ response, ...file }) => ({
    ...file,
    ...response,
  }));
}
