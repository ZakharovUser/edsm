import { AuthGuard } from 'auth/guard';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from 'layouts/dashboard';
import { LoadingScreen } from 'components/loading-screen';

import { NAVIGATION_CONFIG } from 'shared/navigation/config';

// ----------------------------------------------------------------------

const OutboxPage = lazy(() => import('pages/outbox'));
const InboxPage = lazy(() => import('pages/inbox/inbox-page'));
const PageThree = lazy(() => import('pages/dashboard/three'));
const PageFour = lazy(() => import('pages/dashboard/four'));

// ----------------------------------------------------------------------

export const outboxRoutes = [
  {
    path: NAVIGATION_CONFIG.OUTBOX.path,
    element: <OutboxPage />,
  },
];

export const inboxRoutes = [
  {
    path: NAVIGATION_CONFIG.INBOX.path,
    element: <InboxPage />,
  },
];

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
      ...inboxRoutes,
      ...outboxRoutes,

      { path: NAVIGATION_CONFIG.DRAFTS.path, element: <PageThree /> },
      { path: NAVIGATION_CONFIG.REPLACEMENT.path, element: <PageFour /> },
    ],
  },
];
