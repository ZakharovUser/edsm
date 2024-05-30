import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export function SelectFiles() {
  return (
    <Dragger multiple>
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
