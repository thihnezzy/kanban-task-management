import appConfig from '@/configs/app.config';
import useAuthStore from '@/store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute(): React.ReactElement {
  const isAuthenticated = useAuthStore((state) => !!state.user && !!state.accessToken);

  if (!isAuthenticated) {
    return <Navigate to={appConfig.unAuthenticatedEntryPath} />;
  }
  
  return (
    <Outlet />
  );
}

export default ProtectedRoute;
