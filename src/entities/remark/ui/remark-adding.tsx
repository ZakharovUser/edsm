import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'hooks/use-boolean';
import Form, { Field } from 'components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

// -----------------------------------------------------------------------------------------------------------------

const Schema = Yup.object().shape({
  remark: Yup.string().required('Обязательное поле'),
});

type SchemaType = Yup.InferType<typeof Schema>;

interface Props {
  onSave(values: SchemaType, onSuccess?: VoidFunction): void;
}

export function RemarkAdding({ onSave }: Props) {
  const dialog = useBoolean();

  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });

  const onClose = () => {
    methods.reset();
    dialog.onFalse();
  };

  const onSubmit = methods.handleSubmit((data) => onSave(data, onClose));

  return (
    <>
      <IconButton onClick={dialog.onTrue} size="small">
        <AddCircleOutlineRoundedIcon fontSize="small" />
      </IconButton>

      <Dialog open={dialog.value} onClose={onClose}>
        <DialogTitle>Добавить замечание</DialogTitle>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogContent>
            <Box
              sx={{
                width: 400,
                pt: 2,
              }}
            >
              <Field.Text multiline fullWidth name="remark" label="Замечание" rows={6} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="reset" onClick={onClose}>
              Отменить
            </Button>
            <Button type="submit">Добавить</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
}
