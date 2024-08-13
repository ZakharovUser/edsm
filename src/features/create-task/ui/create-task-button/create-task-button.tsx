import { useResponsive } from 'hooks/use-responsive';

import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  onClick: VoidFunction;
  loading?: boolean;
}

export function CreateTaskButton({ onClick, loading }: Props) {
  const downSm = useResponsive('down', 'sm');

  return (
    <LoadingButton
      type="button"
      variant="contained"
      color="primary"
      onClick={onClick}
      loading={loading}
      loadingPosition="start"
      startIcon={<AddIcon sx={{ mr: { sm: 1 } }} />}
    >
      {!downSm ? <Typography>Задача</Typography> : null}
    </LoadingButton>
  );
}
