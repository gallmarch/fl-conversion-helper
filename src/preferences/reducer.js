import { CATEGORY_EXPANSION_CHANGED, ENABLEMENT_PREFERENCE_CHANGED } from './actions';
import { DEFAULT_PREFERENCES, PREFERENCES_CHANGED } from './constants';

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

  function handleEnablementPreferenceChange({ name, value }) {
    return {
      ...state,
    };
  }
}

export default preferencesReducer;
export {
  DEFAULT_PREFERENCES,
};
