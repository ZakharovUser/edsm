import 'dayjs/locale/ru';
import * as Yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'hooks/use-boolean';
import Form, { Field } from 'components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { fDate } from 'utils/format-time';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  date: string | undefined;
}

const Schema = (minDate?: Date) =>
  Yup.object().shape({
    new_deadline_date: Yup.date()
      .typeError('Неверный формат даты')
      .transform((_value, originalValue: Date | Dayjs | null) =>
        originalValue instanceof Date ? originalValue : originalValue?.toDate()
      )
      .nullable()
      .min(minDate, 'Дата раньше текущей')
      .required('Выберите новую дату'),
    message: Yup.string().required('Введите причину'),
  });

export function TaskDueDateExtend({ date }: Props) {
  const dialog = useBoolean();

  const due = dayjs(date);
  const dueDate = due.toDate();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(Schema(dueDate)),
    defaultValues: {
      new_deadline_date: dueDate,
      message: '',
    },
  });

  const onClose = () => {
    methods.reset();
    dialog.onFalse();
  };

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Stack spacing={0.5} direction="row" alignItems="center">
      <Typography sx={{ fontSize: 'inherit' }}>{fDate(date)}</Typography>
      <Tooltip title="Запросить продление">
        <IconButton size="small" onClick={dialog.onTrue}>
          <EditCalendarIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Dialog open={dialog.value} onClose={onClose}>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogTitle>Запрос на продление</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <Stack sx={{ py: 2, minWidth: 400 }} spacing={2}>
                <Field.Date
                  required
                  minDate={due}
                  name="new_deadline_date"
                  label="Дата выполнения"
                />
                <Field.Text name="message" label="Причина" required multiline rows={3} />
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Отмена</Button>
            <Button type="submit">Отправить</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </Stack>
  );
}
