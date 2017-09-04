import { combineReducers } from 'redux';

function preferencesReducer(state = {}, action) {
  switch (action.payload) {
    default:
      return state;
  }
}

export default combineReducers({ preferences: preferencesReducer });
