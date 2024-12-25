import { AuthGuard } from 'auth/guard';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from 'layouts/dashboard';
import { LoadingScreen } from 'components/loading-screen';

import { paths } from 'routes/paths';

// ----------------------------------------------------------------------

const OutboxPage = lazy(() => import('pages/outbox'));
const InboxPage = lazy(() => import('pages/inbox/inbox-page'));
const PageThree = lazy(() => import('pages/dashboard/three'));
const PageFour = lazy(() => import('pages/dashboard/four'));

// ----------------------------------------------------------------------

export const outboxRoutes = [
  {
    path: paths.dashboard.outbox,
    element: <OutboxPage />,
  },
];

export const inboxRoutes = [
  {
    path: paths.dashboard.inbox,
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

      { path: paths.dashboard.drafts, element: <PageThree /> },
      { path: paths.dashboard.replacement, element: <PageFour /> },
    ],
  },
];
