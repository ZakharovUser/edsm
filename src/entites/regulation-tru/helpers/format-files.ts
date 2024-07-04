import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

import { Attachment } from 'shared/attachments/model';

export function formatFiles(event: UploadChangeParam<UploadFile<Attachment>>) {
  return event.fileList.map(({ response, ...file }) => ({
    ...file,
    ...response,
  }));
}
