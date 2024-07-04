import { lazy, Suspense } from 'react';
import { GuestGuard } from 'auth/guard';
import { Outlet } from 'react-router-dom';
import AuthClassicLayout from 'layouts/auth/classic';
import { SplashScreen } from 'components/loading-screen';

// ----------------------------------------------------------------------

// SESSION
const SessionLoginPage = lazy(() => import('pages/auth/session/login'));

// ----------------------------------------------------------------------

const authSession = {
  path: 'login',
  element: (
    <AuthClassicLayout>
      <SessionLoginPage />
    </AuthClassicLayout>
  ),
};

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <GuestGuard>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
    ),
    children: [authSession],
  },
];
