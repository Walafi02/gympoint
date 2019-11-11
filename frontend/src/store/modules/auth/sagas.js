import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });
    console.tron.log(response.data);

    const { token } = response.data;
    console.tron.log(token);
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados.');
  }
}

export default all([
  // takeLatest('persist/REHYDRATE', setToken), // aaction lancada quando se tem um update de pagina
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
