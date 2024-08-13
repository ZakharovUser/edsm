import { useResponsive } from 'hooks/use-responsive';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

// -----------------------------------------------------------------------------------------------------------------

interface Props {
  onClick: VoidFunction;
}

export function CreateTaskButton({ onClick }: Props) {
  const downSm = useResponsive('down', 'sm');

  return (
    <Button
      type="button"
      color="primary"
      onClick={onClick}
      variant="contained"
      startIcon={<AddIcon />}
    >
      {!downSm ? <Typography>Задача</Typography> : null}
    </Button>
  );
}
