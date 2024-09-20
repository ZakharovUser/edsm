import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'hooks/use-boolean';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from 'components/hook-form';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { useCancelTask } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  text?: string;
  taskId: string;
  canCancel: boolean;
};

const schema = Yup.object().shape({
  message: Yup.string().required('Введите причину прекращения задачи'),
});

export function TaskCancelButton({ taskId, canCancel, text = 'Прекратить' }: Props) {
  const confirm = useBoolean(false);

  const { mutate, isPending, reset } = useCancelTask();

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
    if (canCancel) mutate({ taskId, message }, { onSuccess: onClose });
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

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Вы действительно хотите прекратить задачу ?
            </Typography>

            <RHFTextField
              multiline
              autoFocus
              fullWidth
              size="small"
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
        </FormProvider>
      </Dialog>
    </>
  );
}
