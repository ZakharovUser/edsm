import { Helmet } from 'react-helmet-async';

import { JwtLoginView } from 'sections/auth/jwt';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Login</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
