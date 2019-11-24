import React from 'react';
import {StatusBar} from 'react-native';

import SignIn from './pages/SignIn';

// import { Container } from './styles';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SignIn />
    </>
  );
}
