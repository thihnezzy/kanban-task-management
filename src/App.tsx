import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import AppRoutes from './routes/AppRoutes';
import store, { persistor } from './store';
import theme from './theme/theme';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider
            withGlobalClasses
            theme={theme}
            defaultColorScheme="auto"
          >
            <Notifications position="bottom-right" />
            <ModalsProvider>
              <AppRoutes />
            </ModalsProvider>
          </MantineProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
