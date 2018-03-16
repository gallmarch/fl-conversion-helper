import auth from './auth/reducer';
import { combineReducers } from 'redux';
import preferencesReducer from './preferences/reducer';
import sidebar from './sidebar/reducer';

import { FAVOURS_AND_RENOWN } from './factions/actions';

// The default for faction quality information maintains the
// expected structure, so we shouldn't get any attempts to
// access properties of an undefined object.
const INITIAL_FACTION_STATE = { favours: {}, renown: {} };

function mainReducer(state = {}) {
  return state;
}

function attributesReducer(state = {}, action) {
  switch (action.type) {
    case 'ATTRIBUTES':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// When we receive values for Favours and Renown qualities, pack
// them into state
function factionReducer(state = INITIAL_FACTION_STATE, { type, payload }) {
  switch (type) {
    case FAVOURS_AND_RENOWN: {
      const { favours, renown } = payload;
      return { ...state, favours, renown };
    }
    default:
      return state;
  }
}

export default combineReducers({
  attributes: attributesReducer,
  factions: factionReducer,
  auth,
  preferences: preferencesReducer,
  sidebar,
});
