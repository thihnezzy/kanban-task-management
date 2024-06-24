import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import appConfig from '../configs/app.config';
import useAuth from '../utils/hooks/useAuth';

const { unAuthenticatedEntryPath } = appConfig;

function ProtectedRoute(): React.ReactElement {
  const location = useLocation();
  let redirect = `${unAuthenticatedEntryPath}?redirect=${location.pathname}`;
  if (location.pathname === '/login' || location.pathname === '/register') {
    redirect = unAuthenticatedEntryPath;
  }
  const {
    isAuthenticated,
    isConfirmed,
  } = useAuth();
  if (!isAuthenticated()) {
    return (
      <Navigate
        to={`${redirect}`}
        replace
      />
    );
  }
  if (!isConfirmed() && location.pathname !== '/otp') {
    return (
      <Navigate
        to="/otp"
        replace
      />
    );
  }
  return <Outlet />;
}

export default ProtectedRoute;
