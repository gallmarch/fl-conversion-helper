import { combineReducers } from 'redux';
import { CATEGORY_VISIBILITY_CHANGED } from './actions';

function preferencesReducer(state = {}, action) {
  switch (action.type) {
    case 'PREFERENCES_CHANGE':
      return { ...state, preferences: action.payload };
    case CATEGORY_VISIBILITY_CHANGED:
      return {
        ...state,
        visibilities: {
          ...state.visibilities,
          [action.payload.category]: action.payload.visible,
        },
      };
    default:
      return state;
  }
}

export default combineReducers({ preferences: preferencesReducer });
