import { Upload, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export function SelectFiles(props: UploadProps) {
  return (
    <Dragger {...props} multiple withCredentials action="/api/edm/attachments/">
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить</p>
      <p className="ant-upload-hint">
        Поддержка одиночной или массовой загрузки. Строго запрещено загружать запрещенные файлы.
      </p>
    </Dragger>
  );
}
