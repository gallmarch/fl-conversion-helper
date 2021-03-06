import { combineReducers } from 'redux';

import auth from './auth/reducer';
import myself from './myself/reducer';
import possessions from './possessions/reducer';
import preferences from './preferences/reducer';
import attributes from './sidebar/reducer';

export default combineReducers({
  attributes,
  auth,
  myself,
  possessions,
  preferences,
});
