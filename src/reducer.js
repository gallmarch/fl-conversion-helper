import { combineReducers } from 'redux';
import preferencesReducer from './preferences/reducer';

import { FAVOURS_AND_RENOWN } from './factions/actions';

const INITIAL_FACTION_STATE = { favours: {}, renown: {} };


function mainReducer(state = {}, action) {
  return state;
}

function attributesReducer(state = {}, action) {
  switch(action.type) {
    case 'ATTRIBUTES':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function factionReducer(state = INITIAL_FACTION_STATE, action ) {
  switch (action.type) {
    case FAVOURS_AND_RENOWN:
      const { favours, renown } = action.payload;
      return {...state, favours, renown };
    default:
      return state;
  }
}

export default combineReducers({
  attributes: attributesReducer,
  factions: factionReducer,
  mainReducer,
  preferences: preferencesReducer,
});
