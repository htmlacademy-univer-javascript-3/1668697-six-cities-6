import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App';

import { offerMocks } from './mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersData={offerMocks} />
  </React.StrictMode>
);
