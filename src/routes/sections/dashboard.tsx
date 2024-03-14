import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { NAVIGATION_CONFIG } from 'src/shared/navigation/config';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const InboxPage = lazy(() => import('src/pages/inbox/ui'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));

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
