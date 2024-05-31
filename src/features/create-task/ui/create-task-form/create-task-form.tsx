import { useEffect } from 'react';
import { Form, Input, FormInstance } from 'antd';
import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

import { Select } from 'shared/select';

import { SelectFiles } from './select-files';
import { SelectUserGroups } from './select-user-groups';
import { SelectFinancingSources } from './select-financing-sources';

// -----------------------------------------------------------------------------------------------------------------

const importance_options = [
  { label: 'Обычно', value: 'ordinary' },
  { label: 'Важно', value: 'very_important' },
];

const importance_cause_options = [
  { label: 'Аварийная ситуация', value: 'alarm' },
  { label: 'Ошибка планирования', value: 'error' },
  { label: 'Позднее доведение лимитов', value: 'lost_time' },
];

const initial = {
  importance: 'ordinary',
  route: 'Закупка ТРУ',
};

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  onInitForm(form: FormInstance): void;
}

interface Attachment {
  uuid: string;
}

// -----------------------------------------------------------------------------------------------------------------

const normFile = (event: UploadChangeParam<UploadFile<Attachment>>) =>
  event.fileList.map(({ response, ...file }) => ({
    ...file,
    ...response,
  }));

export function CreateTaskForm({ onInitForm }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    onInitForm(form);
  }, [form, onInitForm]);

  const importanceValue = Form.useWatch('importance', form);

  const isImportant = importanceValue === 'important';

  return (
    <Form
      form={form}
      initialValues={initial}
      layout="vertical"
      autoComplete="off"
      name="create-task"
      action="/api/edm/task"
    >
      <Form.Item name="route" label="Регламент">
        <Input readOnly hidden />
      </Form.Item>
      <Form.Item
        label="Важность"
        name="importance"
        rules={[{ required: true, message: 'Выберите важность задачи' }]}
      >
        <Select options={importance_options} />
      </Form.Item>
      {isImportant && (
        <Form.Item
          label="Причина"
          name="reason"
          rules={[{ required: true, message: 'Выберите причину' }]}
        >
          <Select options={importance_cause_options} />
        </Form.Item>
      )}
      <Form.Item
        name="short_name"
        label="Наименование (короткое)"
        rules={[{ required: true, message: 'Введите короткое наименование' }]}
      >
        <Input maxLength={40} showCount />
      </Form.Item>
      <Form.Item
        name="full_name"
        label="Наименование (полное)"
        rules={[{ required: true, message: 'Введите полное наименование' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="finance_source"
        label="Источник финансирования"
        rules={[{ required: true, message: 'Выберите источник финансирования' }]}
      >
        <SelectFinancingSources />
      </Form.Item>
      <Form.Item name="notify" label="Уведомлять">
        <SelectUserGroups />
      </Form.Item>
      <Form.Item name="files" valuePropName="fileList" getValueFromEvent={normFile}>
        <SelectFiles />
      </Form.Item>
    </Form>
  );
}
