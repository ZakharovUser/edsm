import { useFinancingSources } from 'entites/financing-source/hooks';
import { FinancingSourceModel } from 'entites/financing-source/models';

import { Select, SelectProps } from 'shared/select';

// -----------------------------------------------------------------------------------------------------------------

export function SelectFinancingSources() {
  const { data } = useFinancingSources();

  const options = parseOptions(data);

  return <Select options={options} />;
}

// -----------------------------------------------------------------------------------------------------------------

type OptionsType = SelectProps['options'];

function parseOptions(data?: FinancingSourceModel[]): OptionsType {
  return data?.map(({ name, id }) => ({
    value: id,
    label: name,
  }));
}
