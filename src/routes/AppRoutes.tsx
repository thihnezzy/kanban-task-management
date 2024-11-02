import { Loader } from '@mantine/core';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import DashboardPage from '@/pages/Dashboard/DashboardPage';
import DBViewPage from '@/pages/DBView/DBViewPage';

function AppRoutes(): React.ReactElement {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/:id" element={<DashboardPage />} />
        <Route path="/db" element={<DBViewPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
