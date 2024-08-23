import { Typography } from 'antd';

import { useFinancingSources } from 'entites/financing-source/hooks';
import { FinancingSourceModel } from 'entites/financing-source/models';

import { Select, SelectProps } from 'shared/select';

// -----------------------------------------------------------------------------------------------------------------

const { Text } = Typography;

export function SelectFinancingSources(props: SelectProps) {
  const { data, isError, isPending, error } = useFinancingSources();

  const options = parseOptions(data);

  return (
    <>
      <Select {...props} options={options} loading={isPending} />
      {isError && <Text type="danger">${error?.detail}</Text>}
    </>
  );
}

// -----------------------------------------------------------------------------------------------------------------

type OptionsType = SelectProps['options'];

function parseOptions(data?: FinancingSourceModel[]): OptionsType {
  return data?.map(({ name, id }) => ({
    value: id,
    label: name,
  }));
}
