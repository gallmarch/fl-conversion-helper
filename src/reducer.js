import { combineReducers } from 'redux';

import { preferences } from './actions';

const DEFAULT_PREFERENCES = {
  tier1: true,
  tier2: true,
  tier3: true,
  tier4: true,
  factionItems: true,
};

function mainReducer(state = {}, action) {
  return state;
}

function attributesReducer(state = {}, action) {
  return state;
}

function factionReducer(state = { favours: {}, renown: {} }, action ) {
  switch (action.type) {
    case 'FAVOURS_AND_RENOWN':
      const { favours, renown } = action.payload;
      return {...state, favours, renown };
    default:
      return state;
  }
}

function preferencesReducer(state = DEFAULT_PREFERENCES, action) {
  switch (action.type) {
    case preferences.CATEGORY_EXPANSION:
      const { category, expanded } = action.payload;
      return { ...state, [category]: expanded };
    default:
      return state;
  }
  return state;
}

export default combineReducers({
  attributesReducer,
  factions: factionReducer,
  mainReducer,
  preferences: preferencesReducer,
});
