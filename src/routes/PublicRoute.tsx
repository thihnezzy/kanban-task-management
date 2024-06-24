import React from 'react';
import {
  // Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import appConfig from '@/configs/app.config';
// import useAuth from '../utils/hooks/useAuth';

function PublicRoute(): React.ReactElement {
  // const { isAuthenticated, isConfirmed } = useAuth();
  const location = useLocation();
  const [path, setPath] = React.useState<string>('');

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get('redirect');
    setPath(redirect ?? appConfig.authenticatedEntryPath);
  }, [location]);

  // if (isAuthenticated() && isConfirmed() && path) {
  //   return <Navigate to={path} replace />;
  // }
  return <Outlet />;
}

export default PublicRoute;
