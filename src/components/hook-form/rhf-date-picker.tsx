import dayjs, { Dayjs } from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

// -----------------------------------------------------------------------------------------------------------------

type Props = DatePickerProps<Dayjs> & {
  name: string;
  required?: boolean;
  helperText?: string;
};

export default function RHFDatePicker({ name, helperText, required, ...props }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={dayjs(value)}
          slotProps={{
            textField: {
              required,
              error: !!error,
              fullWidth: true,
              helperText: error ? error.message : helperText,
            },
          }}
          {...props}
        />
      )}
    />
  );
}
