import { combineReducers } from 'redux';

function preferencesReducer(state = {}, action) {
  switch (action.type) {
    case 'PREFERENCES_CHANGE':
      console.info('heard PREFERENCES_CHANGE');
      console.info(action);
      return { ...state, preferences: action.payload };
    default:
      return state;
  }
}

export default combineReducers({ preferences: preferencesReducer });
