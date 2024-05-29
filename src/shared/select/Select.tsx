import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';

export interface SelectProps extends AntdSelectProps {}

export function Select(props: SelectProps) {
  return <AntdSelect dropdownStyle={{ zIndex: 1400 }} allowClear {...props} />;
}
