import { Dayjs } from 'dayjs';
import { useMemo, useEffect } from 'react';
import { useAuthContext } from 'auth/hooks';
import { Form, Input, FormItemProps } from 'antd';
import UploadFiles from 'components/upload-files';

import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

import { endpoints } from 'utils/http-client';

import { getValueFromEvent } from 'entities/attachments/helpers';
import { TaskReason, TaskRequest, TaskImportance } from 'entities/task/model';

import { Select } from 'shared/select';

import { formatNotifiers } from '../helpers';

import { SelectDeadline } from './select-deadline';
import { SelectUserGroups } from './select-user-groups';
import { SelectFinancingSources } from './select-financing-sources';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  route: string;
  error?: Error | null;
  getFormId(id: string): void;
  onSubmit(values: Partial<TaskRequest>, onSuccess?: VoidFunction): unknown;
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
  Omit<TaskRequest, 'deadline_date' | 'notified_user_and_group'> & {
    deadline: Dayjs;
    notify: string[];
  }
>;

const config: Record<
  keyof FormValues,
  { name: keyof FormValues; label?: FormItemProps['label']; rules?: FormItemProps['rules'] }
> = {
  documents: { name: 'documents' },
  route: { label: 'Регламент', name: 'route' },
  notify: { label: 'Уведомлять', name: 'notify' },
  reason: {
    name: 'reason',
    label: 'Причина',
    rules: [{ required: true, message: 'Выберите причину' }],
  },
  org_name: {
    name: 'org_name',
    label: 'Учреждение',
    rules: [{ required: true, message: 'Выберите учреждение' }],
  },
  importance: {
    name: 'importance',
    label: 'Важность',
    rules: [{ required: true, message: 'Выберите важность задачи' }],
  },
  deadline: {
    name: 'deadline',
    label: 'Дата выполнения',
    rules: [{ required: true, message: 'Выберите дату выполнение' }],
  },
  full_name: {
    name: 'full_name',
    label: 'Наименование (полное)',
    rules: [{ required: true, message: 'Введите полное наименование' }],
  },
  short_name: {
    name: 'short_name',
    label: 'Наименование (короткое)',
    rules: [{ required: true, message: 'Введите короткое наименование' }],
  },
  finance_source: {
    name: 'finance_source',
    label: 'Источник финансирования',
    rules: [{ required: true, message: 'Выберите источник финансирования' }],
  },
};

// -----------------------------------------------------------------------------------------------------------------

export function TruTaskForm({ getFormId, onSubmit, route, error }: Props) {
  const { user } = useAuthContext();
  const [form] = Form.useForm<FormValues>();

  useEffect(() => getFormId(route), [getFormId, route]);

  const initial = useMemo(
    () => ({
      route,
      importance: 'ordinary',
    }),
    [route]
  );

  const institutes = useMemo(
    () =>
      user?.org_list.map((org) => ({
        value: org.id,
        label: org.name,
      })),
    [user?.org_list]
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
          {error.message}
        </Alert>
      )}
      <Form.Item {...config.route} hidden>
        <Input readOnly value={route} />
      </Form.Item>
      <Form.Item {...config.org_name}>
        <Select options={institutes} />
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
      <Form.Item
        {...config.documents}
        valuePropName="fileList"
        getValueFromEvent={getValueFromEvent}
      >
        <UploadFiles action={endpoints.attachment.new} />
      </Form.Item>
    </Form>
  );
}
