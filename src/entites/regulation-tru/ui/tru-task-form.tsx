import { Dayjs } from 'dayjs';
import { useMemo, useEffect } from 'react';
import { Form, Input, UploadFile, FormItemProps } from 'antd';

import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

import { UploadAttachment } from 'entites/attachments/model';
import { Task, TaskReason, TaskImportance } from 'entites/task/model';

import { Select } from 'shared/select';

import { formatFiles, formatNotifiers } from '../helpers';

import { SelectFiles } from './select-files';
import { SelectDeadline } from './select-deadline';
import { SelectUserGroups } from './select-user-groups';
import { SelectFinancingSources } from './select-financing-sources';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  route: string;
  error?: Error | null;
  getFormId(id: string): void;
  onSubmit(values: unknown, onSuccess?: VoidFunction): unknown;
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
  Omit<
    Task,
    | 'route'
    | 'documents'
    | 'task_number'
    | 'creation_date'
    | 'deadline_date'
    | 'notified_user_and_group'
  > & {
    route: string;
    deadline: Dayjs;
    notify: string[];
    documents: UploadFile<UploadAttachment>[];
  }
>;

const config: Record<
  keyof FormValues,
  { name: keyof FormValues; label?: string; rules?: FormItemProps['rules'] }
> = {
  documents: { name: 'documents' },
  route: { label: 'Регламент', name: 'route' },
  notify: { label: 'Уведомлять', name: 'notify' },
  reason: {
    label: 'Причина',
    name: 'reason',
    rules: [{ required: true, message: 'Выберите причину' }],
  },
  importance: {
    label: 'Важность',
    name: 'importance',
    rules: [{ required: true, message: 'Выберите важность задачи' }],
  },
  deadline: {
    label: 'Дата выполнения',
    name: 'deadline',
    rules: [{ required: true, message: 'Выберите дату выполнение' }],
  },
  full_name: {
    label: 'Наименование (полное)',
    name: 'full_name',
    rules: [{ required: true, message: 'Введите полное наименование' }],
  },
  short_name: {
    label: 'Наименование (короткое)',
    name: 'short_name',
    rules: [{ required: true, message: 'Введите короткое наименование' }],
  },
  finance_source: {
    label: 'Источник финансирования',
    name: 'finance_source',
    rules: [{ required: true, message: 'Выберите источник финансирования' }],
  },
};

// -----------------------------------------------------------------------------------------------------------------

export function TruTaskForm({ getFormId, onSubmit, route, error }: Props) {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => getFormId(route), [getFormId, route]);

  const initial: FormValues = useMemo(
    () => ({
      route,
      importance: 'ordinary',
    }),
    [route]
  );

  const submit = () => {
    const { notify, deadline, ...values } = form.getFieldsValue();

    onSubmit(
      {
        ...values,
        deadline_date: deadline?.format('YYYY-MM-DD'),
        notified_user_and_group: notify && formatNotifiers(notify),
      },
      form.resetFields
    );
  };

  const importanceValue = Form.useWatch('importance', form);

  const isImportant = importanceValue === 'very_important';

  return (
    <Form
      form={form}
      id={route}
      name={route}
      layout="vertical"
      autoComplete="off"
      initialValues={initial}
      onFinish={submit}
    >
      {error && (
        <Alert sx={{ mb: 1 }} severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          {JSON.stringify(error)}
        </Alert>
      )}

      <Form.Item {...config.route} hidden>
        <Input readOnly value={route} />
      </Form.Item>
      <Form.Item {...config.importance}>
        <Select options={importance_options} />
      </Form.Item>
      {isImportant && (
        <Form.Item {...config.reason}>
          <Select options={importance_cause_options} />
        </Form.Item>
      )}
      <Form.Item {...config.short_name}>
        <Input maxLength={40} showCount />
      </Form.Item>
      <Form.Item {...config.full_name}>
        <Input />
      </Form.Item>
      <Form.Item {...config.finance_source}>
        <SelectFinancingSources />
      </Form.Item>
      <Form.Item {...config.deadline}>
        <SelectDeadline />
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
