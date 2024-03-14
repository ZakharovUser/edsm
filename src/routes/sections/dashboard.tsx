import { lazy, Suspense } from 'react';
import { AuthGuard } from 'auth/guard';
import { Outlet } from 'react-router-dom';
import DashboardLayout from 'layouts/dashboard';

import { LoadingScreen } from 'components/loading-screen';

import { NAVIGATION_CONFIG } from 'shared/navigation/config';

// ----------------------------------------------------------------------

const InboxPage = lazy(() => import('pages/inbox/ui'));
const PageTwo = lazy(() => import('pages/dashboard/two'));
const PageThree = lazy(() => import('pages/dashboard/three'));
const PageFour = lazy(() => import('pages/dashboard/four'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { path: NAVIGATION_CONFIG.INBOX.path, element: <InboxPage /> },
      { path: NAVIGATION_CONFIG.OUTBOX.path, element: <PageTwo /> },
      { path: NAVIGATION_CONFIG.DRAFTS.path, element: <PageThree /> },
      { path: NAVIGATION_CONFIG.REPLACEMENT.path, element: <PageFour /> },
    ],
  },
];
