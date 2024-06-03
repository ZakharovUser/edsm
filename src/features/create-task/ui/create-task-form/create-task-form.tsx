import { useEffect } from 'react';
import { Form, Input } from 'antd';
import { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';

import { httpClient } from 'utils/axios';

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
  id: 'purchase-TRU-form',
};

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  getFormId(id: string): void;
}

interface Attachment {
  uuid: string;
}

type FormValues = Partial<{
  id: string;
  notify: string[];
  name_full: string;
  name_short: string;
  importance: string;
  importance_cause: string;
  source_financing: number;
  files: UploadFile<Attachment>[];
}>;

// -----------------------------------------------------------------------------------------------------------------

function getFiles(event: UploadChangeParam<UploadFile<Attachment>>) {
  return event.fileList.map(({ response, ...file }) => ({
    ...file,
    ...response,
  }));
}

function formatNotifiers(notifiers: string[]) {
  return notifiers.reduce(
    (notifications: Array<{ type: string; value: string | number }>, value) => {
      const notifier = value.match(/^[^:]+/);

      if (!notifier) return notifications;

      const groupId = parseInt(notifier[0], 10);

      if (groupId) {
        notifications.push({ type: 'group', value: groupId });
      } else {
        notifications.push({ type: 'user', value: notifier[0] });
      }

      return notifications;
    },
    []
  );
}

async function createTask(values: any) {
  return httpClient.post('/api/edm/task/', values);
}

// -----------------------------------------------------------------------------------------------------------------

export function CreateTaskForm({ getFormId }: Props) {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    getFormId(initial.id);
  }, [form, getFormId]);

  const submit = () => {
    const { notify, ...values } = form.getFieldsValue();

    createTask({ ...values, notify: notify && formatNotifiers(notify) });
  };

  const importanceValue = Form.useWatch('importance', form);

  const isImportant = importanceValue === 'important';

  return (
    <Form
      form={form}
      id={initial.id}
      name={initial.id}
      layout="vertical"
      autoComplete="off"
      initialValues={initial}
      onFinish={submit}
    >
      <Form.Item name="route" label="Регламент">
        <Input readOnly hidden />
      </Form.Item>
      <Form.Item name="id" hidden>
        <Input readOnly />
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
      <Form.Item name="files" valuePropName="fileList" getValueFromEvent={getFiles}>
        <SelectFiles />
      </Form.Item>
    </Form>
  );
}
