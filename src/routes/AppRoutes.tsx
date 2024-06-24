import { Loader } from '@mantine/core';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import DashboardPage from '@/pages/Dashboard/DashboardPage';
// import PageContainer from '../components/Layout/PageContainer.tsx';
// import appConfig from '../configs/app.config.ts';
// import { authRoute, commonRoute, mainRoute } from '../configs/routes.config.ts';

// import CommonRoute from './CommonRoute.tsx';
// import ProtectedRoute from './ProtectedRoute.tsx';
// import PublicRoute from './PublicRoute.tsx';

function AppRoutes(): React.ReactElement {
  React.useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'login-event') {
        window.location.reload();
      }
    });
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/:id" element={<DashboardPage />} />
        {/* <Route element={<CommonRoute />}>
              {commonRoute.map((route) => (
                <Route key={route.path} path={route.path} element={<route.component />} />
              ))}
            </Route>
            <Route element={<PublicRoute />}>
              {authRoute.map((route) => (
                <Route key={route.path} path={route.path} element={<route.component />} />
              ))}
            </Route>

            <Route element={<ProtectedRoute />}>
              {mainRoute.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={(
                    <PageContainer header={route.header}>
                      <route.component />
                    </PageContainer>
                  )}
                />
              ))}
            </Route> */}
        {/* Redirections */}
        {/* <Route path="/" element={<Navigate replace to={`${authenticatedEntryPath}`} />} />
            <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
