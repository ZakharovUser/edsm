import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'hooks/use-boolean';
import Form, { Field } from 'components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { useCancelTask } from 'entities/task/api';

import { toast } from 'shared/ui/snackbar';
import { HttpClientError } from 'shared/api/types';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  text?: string;
  taskId: string | null;
  canCancel: boolean;
};

const schema = Yup.object().shape({
  message: Yup.string().required('Введите причину прекращения задачи'),
});

export function TaskCancelButton({ taskId, canCancel, text = 'Прекратить' }: Props) {
  const confirm = useBoolean(false);

  const { mutateAsync, isPending, reset } = useCancelTask();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onClose = () => {
    if (!isPending) {
      reset();
      methods.reset();
      confirm.onFalse();
    }
  };

  const onSubmit = methods.handleSubmit(({ message }) => {
    if (taskId && canCancel) {
      const promise = mutateAsync({ taskId, message }, { onSuccess: onClose });

      toast.promise(promise, {
        loading: 'Прекращение задачи',
        success: 'Задача прекращена',
        error: (error: HttpClientError) => error.message,
      });
    }
  });

  return (
    <>
      <LoadingButton
        type="button"
        loading={isPending}
        disabled={!canCancel}
        onClick={confirm.onTrue}
      >
        {text}
      </LoadingButton>

      <Dialog fullWidth maxWidth="xs" open={confirm.value} onClose={onClose}>
        <DialogTitle sx={{ pb: 2 }}>{text}</DialogTitle>

        <Form methods={methods} onSubmit={onSubmit}>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Вы действительно хотите прекратить задачу ?
            </Typography>

            <Field.Text
              required
              multiline
              autoFocus
              fullWidth
              type="text"
              name="message"
              label="Причина"
              variant="outlined"
            />
          </DialogContent>

          <DialogActions>
            <Button
              type="reset"
              color="error"
              variant="contained"
              disabled={isPending}
              onClick={onClose}
            >
              Отмена
            </Button>
            <LoadingButton type="submit" color="inherit" variant="outlined" disabled={isPending}>
              Подтвердить
            </LoadingButton>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
}
