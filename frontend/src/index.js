import React from 'react';
import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';
import { restoreCSRF, fetch } from './store/csrf';
import * as sessionActions from './store/session'
import * as cartActions from './store/carts'
import { ModalProvider } from './Context/Modal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = fetch
  window.store = store;
  window.sessionActions = sessionActions
  window.cartActions = cartActions
};

function Root() {
  return (
    <Provider store={store}>
    <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalProvider>
  </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
