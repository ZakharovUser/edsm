import 'dayjs/locale/ru';
import { z as zod } from 'zod';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import Form, { Field } from 'components/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { TaskDeadlineExtendValues } from 'entities/task/model';

import { Callback } from 'shared/types';

// -----------------------------------------------------------------------------------------------------------------

export interface TaskDeadlineExtendFormProps {
  open: boolean;
  value: string;
  error?: Error | null;
  loading?: boolean;
  onClose: VoidFunction;
  onSubmit: Callback<TaskDeadlineExtendValues, Promise<void>>;
}

const Schema = (minDate: Dayjs) =>
  zod.object({
    message: zod.string().min(1, 'Введите причину'),
    deadline: zod
      .custom<Dayjs>()
      .nullable()
      .refine((date) => date !== null, 'Введите дату')
      .refine((date) => date?.isValid(), 'Неверный формат даты')
      .refine((date) => !date?.isSame(minDate), 'Выбрана текущая дата')
      .refine((date) => !date?.isBefore(minDate), 'Дата раньше текущей'),
  });

export function TaskDeadlineExtendForm({
  open,
  value,
  error,
  loading,
  onClose,
  onSubmit,
}: TaskDeadlineExtendFormProps) {
  const due = dayjs(value);

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(Schema(due)),
    defaultValues: {
      deadline: due,
      message: '',
    },
  });

  const closeHandler = () => {
    methods.reset();
    onClose();
  };

  const submitHandler = methods.handleSubmit(async ({ message, deadline }) => {
    onSubmit({ message, new_deadline_date: deadline.format('YYYY-MM-DD') }).then(closeHandler);
  });

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>Запрос на продление</DialogTitle>
      <Form methods={methods} onSubmit={submitHandler}>
        <DialogContent>
          {error && <Alert severity="error">{error.message}</Alert>}

          <Stack spacing={2} sx={{ pt: 2, minWidth: 300 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <Field.Date required minDate={due} name="deadline" label="Дата выполнения" />
            </LocalizationProvider>
            <Field.Text required multiline name="message" label="Причина" rows={3} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton type="submit" loading={loading}>
            Отправить
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
