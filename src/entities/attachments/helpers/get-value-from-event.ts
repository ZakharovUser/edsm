import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

import { AttachmentUUID } from '../model';

export function getValueFromEvent(event: UploadChangeParam<UploadFile<AttachmentUUID>>) {
  return event.fileList.map(({ response, ...file }) => ({
    ...file,
    ...response,
  }));
}
