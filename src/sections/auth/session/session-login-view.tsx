import * as Yup from 'yup';
import { useState } from 'react';
import Iconify from 'components/iconify';
import { useForm } from 'react-hook-form';
import { useAuthContext } from 'auth/hooks';
import { useBoolean } from 'hooks/use-boolean';
import { PATH_AFTER_LOGIN } from 'config-global';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from 'components/hook-form';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter, useSearchParams } from 'routes/hooks';

// ----------------------------------------------------------------------

interface FormProps {
  password: ReturnType<typeof useBoolean>;
  errorMessage?: string;
  loading?: boolean;
}

const Form = ({ errorMessage, password, loading }: FormProps) => (
  <Stack spacing={2.5}>
    {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

    <RHFTextField name="username" label="Username" />

    <RHFTextField
      name="password"
      label="Password"
      type={password.value ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={password.onToggle} edge="end">
              <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

    <LoadingButton
      fullWidth
      color="inherit"
      size="large"
      type="submit"
      variant="contained"
      loading={loading}
    >
      Login
    </LoadingButton>
  </Stack>
);

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const defaultValues = {
  username: 'admin',
  password: 'P@ssw0rd',
};

export function SessionLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.username, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message || error.detail);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">Вход</Typography>
      </Stack>
      <Form errorMessage={errorMsg} password={password} loading={isSubmitting} />
    </FormProvider>
  );
}
