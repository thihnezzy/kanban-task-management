import React from 'react';
import { Outlet } from 'react-router-dom';

function CommonRoute(): React.ReactElement {
  return (
    <Outlet />
  );
}

export default CommonRoute;
