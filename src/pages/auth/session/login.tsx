import { Helmet } from 'react-helmet-async';

import { SessionLoginView } from 'sections/auth/session';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Вход</title>
      </Helmet>

      <SessionLoginView />
    </>
  );
}
