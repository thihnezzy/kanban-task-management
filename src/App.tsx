import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import KanbanProvider from './contexts/KanbanContext';
import AppRoutes from './routes/AppRoutes';
import theme from './theme/theme';

const queryClient = new QueryClient();

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalClasses
          theme={theme}
        >
          <Notifications position="bottom-right" />
          <KanbanProvider>
            <AppRoutes />
          </KanbanProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
