import { combineReducers } from 'redux';

import auth from './auth/reducers';
import user from './user/reducer';

export default combineReducers({
  auth,
  user,
});
