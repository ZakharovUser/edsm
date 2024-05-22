import { useEffect } from 'react';
import { Form, Input, Select, FormInstance } from 'antd';

import { SelectUserGroups } from './select-user-groups';

// -----------------------------------------------------------------------------------------------------------------

const importance_options = [
  { label: 'Обычно', value: 'usually' },
  { label: 'Важно', value: 'important' },
];

const importance_cause_options = [
  { label: 'Аварийная ситуация', value: 'emergency' },
  { label: 'Ошибка планирования', value: 'planning_error' },
  { label: 'Позднее доведение лимитов', value: 'late_finished_limits' },
];

const initial = {
  importance: 'usually',
};

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  onInitForm(form: FormInstance): void;
}

export function CreateTaskForm({ onInitForm }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    onInitForm(form);
  }, [form, onInitForm]);

  const importanceValue = Form.useWatch('importance', form);

  const isImportant = importanceValue === 'important';

  return (
    <Form initialValues={initial} form={form} autoComplete="off" layout="vertical">
      <Form.Item label="Важность" name="importance" rules={[{ required: true }]}>
        <Select options={importance_options} dropdownStyle={{ zIndex: 1500 }} />
      </Form.Item>
      {isImportant && (
        <Form.Item
          label="Причина"
          name="importance_cause"
          rules={[{ required: true, message: 'Выберите причину' }]}
        >
          <Select options={importance_cause_options} dropdownStyle={{ zIndex: 1500 }} />
        </Form.Item>
      )}
      <Form.Item
        name="name_short"
        label="Наименование (короткое)"
        rules={[{ required: true, message: 'Введите короткое наименование' }]}
      >
        <Input maxLength={40} />
      </Form.Item>
      <Form.Item
        name="name_full"
        label="Наименование (полное)"
        rules={[{ required: true, message: 'Введите полное наименование' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="source_financing"
        label="Источник финансирования"
        rules={[{ required: true, message: 'Выберите источник финансирования' }]}
      >
        <Select />
      </Form.Item>
      <Form.Item name="notify" label="Уведомлять">
        <SelectUserGroups />
      </Form.Item>
    </Form>
  );
}