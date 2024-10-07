import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

import { UploadAttachmentModel } from '../model';

export function getValueFromEvent(event: UploadChangeParam<UploadFile<UploadAttachmentModel>>) {
  return event.fileList.map(({ response, ...file }) => ({
    ...file,
    ...response,
  }));
}
