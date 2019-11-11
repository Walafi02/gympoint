import { all } from 'redux-saga/effects';

import auth from './auth/sagas';

export default function* rootsaga() {
  return yield all([auth]);
}
