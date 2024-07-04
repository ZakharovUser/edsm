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
    <Button type="button" variant="contained" color="primary" onClick={onClick}>
      <AddIcon sx={{ mr: { sm: 1 } }} />
      {!downSm ? <Typography>Задача</Typography> : null}
    </Button>
  );
}
