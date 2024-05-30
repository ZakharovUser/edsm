import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

interface Props {}

export function SelectFiles(props: Props) {
  return (
    <Dragger multiple>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
    </Dragger>
  );
}
