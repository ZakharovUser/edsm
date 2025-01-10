import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'hooks/use-boolean';
import Form, { Field } from 'components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { useRejectTask } from 'entities/task/api';

import { toast } from 'shared/ui/snackbar';
import { HttpClientError } from 'shared/api/types';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  taskId: string | null;
  canReject: boolean;
  text?: string;
};

const schema = Yup.object().shape({
  message: Yup.string().required('Введите причину'),
});

type SchemaType = Yup.InferType<typeof schema>;

export function TaskRejectButton({ taskId, canReject, text = 'Отклонить' }: Props) {
  const confirm = useBoolean(false);

  const { mutateAsync, isPending, reset } = useRejectTask();

  const methods = useForm<SchemaType>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      message: '',
    },
  });

  const onClose = () => {
    if (!isPending) {
      reset();
      methods.reset();
      confirm.onFalse();
    }
  };

  const onSubmit = methods.handleSubmit(({ message }) => {
    if (taskId && canReject) {
      const promise = mutateAsync({ taskId, message }, { onSuccess: onClose });

      toast.promise(promise, {
        loading: 'Отклонение',
        success: 'Отклонено',
        error: (error: HttpClientError) => error.message,
      });
    }
  });

  return (
    <>
      <LoadingButton
        type="button"
        loading={isPending}
        disabled={!canReject}
        onClick={confirm.onTrue}
      >
        {text}
      </LoadingButton>

      <Dialog fullWidth maxWidth="xs" open={confirm.value} onClose={onClose}>
        <DialogTitle sx={{ pb: 2 }}>{text}</DialogTitle>

        <Form methods={methods} onSubmit={onSubmit}>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Вы действительно хотите отклонить задачу ?
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
