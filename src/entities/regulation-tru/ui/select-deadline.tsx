import dayjs from 'dayjs';
import { Flex, DatePicker, DatePickerProps } from 'antd';

import { fDate } from 'utils/format-time';

// -----------------------------------------------------------------------------------------------------------------

export function SelectDeadline(props: DatePickerProps) {
  const now = dayjs();

  return (
    <Flex vertical>
      <DatePicker {...props} minDate={now} format={(value) => `до ${fDate(value.toDate())}`} />
    </Flex>
  );
}
