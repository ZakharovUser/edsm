import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'hooks/use-boolean';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from 'components/hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { useRejectTask } from 'entities/task/api';

// -----------------------------------------------------------------------------------------------------------------

type Props = {
  taskId: string;
  canReject: boolean;
  text?: string;
};

const schema = Yup.object().shape({
  message: Yup.string(),
});

export function TaskRejectButton({ taskId, canReject, text = 'Отклонить' }: Props) {
  const confirm = useBoolean(false);

  const { mutate, isPending, reset } = useRejectTask();

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
    if (canReject) mutate({ taskId, message }, { onSuccess: onClose });
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

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Вы действительно хотите отклонить задачу ?
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
