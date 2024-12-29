import React from 'react';

const protectedRoutes = [
  {
    path: '/dashboard',
    element: React.lazy(() => import('@/pages/Dashboard/DashboardPage')),
    withHeader: true,
  },
  {
    path: '/dashboard/:id',
    element: React.lazy(() => import('@/pages/Dashboard/DashboardPage')),
    withHeader: true,
  },
];

const publicRoutes = [
  {
    path: '/auth',
    element: React.lazy(() => import('@/pages/Auth/AuthPage')),
    withHeader: false,
  },
];

export { protectedRoutes, publicRoutes };
