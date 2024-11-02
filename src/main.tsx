import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
// import makeServer from './mirage';
import './index.css';
import './reset.css';

// if (import.meta.env.DEV) {
//   makeServer();
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />,
);
