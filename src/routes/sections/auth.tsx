import { lazy, Suspense } from 'react';
import { GuestGuard } from 'auth/guard';
import { Outlet } from 'react-router-dom';
import AuthClassicLayout from 'layouts/auth/classic';

import { SplashScreen } from 'components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('pages/auth/jwt/register'));

// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <JwtRegisterPage />
        </AuthClassicLayout>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt],
  },
];
