import { m } from 'framer-motion';
import { varBounce, MotionContainer } from 'components/animate';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'routes/components';

export default function ErrorView() {
  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Неизвестная ошибка
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          Произошла ошибка, попробуйте еще раз позже.
        </Typography>
      </m.div>

      <Button component={RouterLink} href="/" size="large" variant="contained">
        Домой
      </Button>
    </MotionContainer>
  );
}
