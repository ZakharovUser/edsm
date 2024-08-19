import dayjs from 'dayjs';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ru from 'date-fns/locale/ru';
import { Flex, DatePicker, DatePickerProps } from 'antd';

// -----------------------------------------------------------------------------------------------------------------

const formatDate: DatePickerProps['format'] = (value) =>
  `до ${format(value.toDate(), 'PP', { locale: ru })}`;

export function SelectDeadline(props: DatePickerProps) {
  return (
    <Flex vertical>
      <DatePicker {...props} format={formatDate} minDate={dayjs()} />
    </Flex>
  );
}
