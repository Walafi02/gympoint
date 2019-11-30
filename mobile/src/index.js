import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

// import SignIn from './pages/SignIn';
import Routes from './App';
import './config/ReactotronConfig';

import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Routes />
    </Provider>
  );
}
