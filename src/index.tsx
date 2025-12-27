import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { HistoryRouter } from './components';
import { browserHistory } from './browser-history';

import App from './app/app';

import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HistoryRouter history={browserHistory} >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HistoryRouter>
  </Provider>
);
