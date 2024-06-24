import React from 'react';

import MainContent from '@/components/Dashboard/MainContent';
import PageContainer from '@/components/layout/PageContainer';

function DashboardPage(): React.ReactElement {
  return (
    <PageContainer>
      <MainContent />
    </PageContainer>
  );
}

export default DashboardPage;
