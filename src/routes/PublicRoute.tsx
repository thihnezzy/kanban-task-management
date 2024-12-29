import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store';
import appConfig from '@/configs/app.config';


function PublicRoute(): React.ReactElement {
  const isAuthenticated = useAuthStore((state) => !!state.user && !!state.accessToken);

  if (isAuthenticated) {
    return <Navigate to={appConfig.authenticatedEntryPath} />;
  }

  return (
    <Outlet />
  );
}

export default PublicRoute;
