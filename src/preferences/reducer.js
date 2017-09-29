import { CATEGORY_EXPANSION_CHANGED } from './actions';
import { DEFAULT_PREFERENCES } from './constants';

const PREFERENCES_CHANGED = 'PREFERENCES_CHANGED';


function preferencesReducer(state = DEFAULT_PREFERENCES, { type, payload }) {
  switch (type) {
    case CATEGORY_EXPANSION_CHANGED:
      return handleCategoryExpansion(payload);
    case PREFERENCES_CHANGED:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }

  function handleCategoryExpansion({ category, expanded }) {
    return {
      ...state,
      expanded: {
        ...state.expanded,
        [category]: expanded,
      },
    };
  }
}

export default preferencesReducer;
export {
  DEFAULT_PREFERENCES,
};
