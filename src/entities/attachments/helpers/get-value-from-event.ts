import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

import { AttachmentUUID, AttachmentModel } from '../model';

export function getValueFromEvent(
  event: UploadChangeParam<UploadFile<AttachmentUUID>>
): AttachmentModel[] {
  return event.fileList.map(({ response, uid, url, name, size, lastModified }) => ({
    uuid: response?.uuid || uid,
    uid,
    url,
    name,
    size,
    lastModified,
  }));
}
