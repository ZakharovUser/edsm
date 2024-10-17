import 'dayjs/locale/ru';
import * as Yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'hooks/use-boolean';
import Form, { Field } from 'components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { fDate } from 'utils/format-time';

import { Task } from 'entities/task/model';
import { useTaskDeadlineExtend } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

const Schema = (minDate?: Date) =>
  Yup.object().shape({
    new_deadline_date: Yup.date()
      .typeError('Неверный формат даты')
      .transform((_value, originalValue: Date | Dayjs | null) =>
        originalValue instanceof Date ? originalValue : originalValue?.toDate()
      )
      .nullable()
      .min(minDate || new Date(), 'Дата раньше текущей')
      .required('Выберите новую дату'),
    message: Yup.string().required('Введите причину'),
  });

interface Props {
  taskId: Task['task_number'] | undefined;
  date: Task['deadline_date'] | undefined;
}

export function TaskDueDateExtend({ taskId, date }: Props) {
  const deadlineExtend = useTaskDeadlineExtend();

  const dialog = useBoolean();

  const due = date ? dayjs(date) : undefined;
  const dueDate = due ? due.toDate() : new Date();

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
    deadlineExtend.reset();
    dialog.onFalse();
  };

  const onSubmit = methods.handleSubmit((body) => {
    deadlineExtend.mutate({ taskId, body }, { onSuccess: () => onClose() });
  });

  return (
    <Stack spacing={0.5} direction="row" alignItems="center">
      <Typography sx={{ fontSize: 'inherit' }}>{fDate(date)}</Typography>

      {date && (
        <Tooltip title="Запросить продление">
          <IconButton size="small" onClick={dialog.onTrue}>
            <EditCalendarIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={dialog.value} onClose={onClose}>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogTitle>Запрос на продление</DialogTitle>
          <DialogContent>
            {deadlineExtend.isError && (
              <Alert severity="error">{deadlineExtend.error.message}</Alert>
            )}

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
            <LoadingButton type="submit" loading={deadlineExtend.isPending}>
              Отправить
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </Stack>
  );
}
