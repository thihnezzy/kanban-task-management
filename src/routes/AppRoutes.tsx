import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { protectedRoutes, publicRoutes } from '@/configs/routes.config';
import ProtectedRoute from './ProtectedRoute';
import PageContainer from '@/components/layout/PageContainer';
import PublicRoute from './PublicRoute';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';


function AppRoutes(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <Routes>
        <>
          <Route element={<PublicRoute />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
          <Route element={<ProtectedRoute />}>
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={(
                  <PageContainer>
                    <route.element />
                  </PageContainer>
                )}
              />
            ))}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
