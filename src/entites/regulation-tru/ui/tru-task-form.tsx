import { useEffect } from 'react';
import { Form, Input, UploadFile } from 'antd';

import { UploadAttachment } from 'entites/attachments/model';
import { Task, TaskReason, TaskImportance } from 'entites/task/model';

import { Select } from 'shared/select';

import { formatFiles, formatNotifiers } from '../helpers';

import { SelectFiles } from './select-files';
import { SelectUserGroups } from './select-user-groups';
import { SelectFinancingSources } from './select-financing-sources';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  getFormId(id: string): void;
  onSubmit(values: unknown): Promise<unknown>;
  onError?: (error: unknown) => void;
}

// -----------------------------------------------------------------------------------------------------------------

type Options<T> = Array<{
  label: string;
  value: T;
}>;

const importance_options: Options<keyof typeof TaskImportance> = [
  { label: 'Обычно', value: 'ordinary' },
  { label: 'Важно', value: 'very_important' },
];

const importance_cause_options: Options<keyof typeof TaskReason> = [
  { label: 'Аварийная ситуация', value: 'alarm' },
  { label: 'Ошибка планирования', value: 'error' },
  { label: 'Позднее доведение лимитов', value: 'lost_time' },
];

type FormValues = Partial<
  Omit<Task, 'documents' | 'notified_user_and_group' | 'task_number' | 'creation_date'> & {
    documents: UploadFile<UploadAttachment>[];
    notify: string[];
  }
>;

const config: Record<keyof FormValues, { label?: string; name: keyof FormValues }> = {
  documents: { name: 'documents' },
  route: { label: 'Регламент', name: 'route' },
  reason: { label: 'Причина', name: 'reason' },
  notify: { label: 'Уведомлять', name: 'notify' },
  importance: { label: 'Важность', name: 'importance' },
  full_name: { label: 'Наименование (полное)', name: 'full_name' },
  short_name: { label: 'Наименование (короткое)', name: 'short_name' },
  finance_source: { label: 'Источник финансирования', name: 'finance_source' },
};

const initial: FormValues = {
  importance: 'ordinary',
};

// -----------------------------------------------------------------------------------------------------------------

export function TruTaskForm({ getFormId, onSubmit, onError }: Props) {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    // getFormId(initial.route as string);
  }, [getFormId]);

  const submit = () => {
    const { notify, ...values } = form.getFieldsValue();

    onSubmit({ ...values, notified_user_and_group: notify && formatNotifiers(notify) })
      .then(() => form.resetFields())
      .catch((err) => onError?.(err) || alert(err));
  };

  const importanceValue = Form.useWatch('importance', form);

  const isImportant = importanceValue === 'very_important';

  return (
    <Form
      form={form}
      // id={initial.route}
      // name={initial.route}
      layout="vertical"
      autoComplete="off"
      initialValues={initial}
      onFinish={submit}
    >
      <Form.Item {...config.route} hidden>
        <Input readOnly />
      </Form.Item>
      <Form.Item
        {...config.importance}
        rules={[{ required: true, message: 'Выберите важность задачи' }]}
      >
        <Select options={importance_options} />
      </Form.Item>
      {isImportant && (
        <Form.Item {...config.reason} rules={[{ required: true, message: 'Выберите причину' }]}>
          <Select options={importance_cause_options} />
        </Form.Item>
      )}
      <Form.Item
        {...config.short_name}
        rules={[{ required: true, message: 'Введите короткое наименование' }]}
      >
        <Input maxLength={40} showCount />
      </Form.Item>
      <Form.Item
        {...config.full_name}
        rules={[{ required: true, message: 'Введите полное наименование' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...config.finance_source}
        rules={[{ required: true, message: 'Выберите источник финансирования' }]}
      >
        <SelectFinancingSources />
      </Form.Item>
      <Form.Item {...config.notify}>
        <SelectUserGroups />
      </Form.Item>
      <Form.Item {...config.documents} valuePropName="fileList" getValueFromEvent={formatFiles}>
        <SelectFiles />
      </Form.Item>
    </Form>
  );
}
