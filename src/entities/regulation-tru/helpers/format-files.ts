import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

import { UploadAttachment } from 'entities/attachments/model';

export function formatFiles(event: UploadChangeParam<UploadFile<UploadAttachment>>) {
  return event.fileList.map(({ response, ...file }) => ({
    ...file,
    ...response,
  }));
}
