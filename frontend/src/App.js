import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import Routes from './routes';

import GlobalStyles from './styles/global';
import history from './services/history';

import { store } from './store';

export default function src() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />;
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}
