import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'hooks/use-responsive';

export default function CreateTaskButton() {
  const downSm = useResponsive('down', 'sm');

  return (
    <Button type="button" variant="contained" color="primary">
      <AddIcon sx={{ mr: { sm: 1 } }} />
      {!downSm ? <Typography>Задача</Typography> : null}
    </Button>
  );
}
