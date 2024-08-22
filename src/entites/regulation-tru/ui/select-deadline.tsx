import dayjs from 'dayjs';
import { Flex, DatePicker, DatePickerProps } from 'antd';

import { formatDate } from 'shared/helpers/format-date';

// -----------------------------------------------------------------------------------------------------------------

export function SelectDeadline(props: DatePickerProps) {
  const now = dayjs();

  return (
    <Flex vertical>
      <DatePicker {...props} minDate={now} format={(value) => `до ${formatDate(value.toDate())}`} />
    </Flex>
  );
}
