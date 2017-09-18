import { CATEGORY_EXPANSION_CHANGED } from './actions';

const PREFERENCES_CHANGED = 'PREFERENCES_CHANGED';

// Use these as the default expansion/visibility states if we don't
// have meaningful data
const DEFAULT_PREFERENCES = {
  expansions: {
    tier1: false,
    tier2: false,
    tier3: false,
    tier4: false,
    faction: false,
  },
  visibilities: {
    tier1: true,
    tier2: true,
    tier3: true,
    tier4: true,
    faction: true,
  },
};

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
  return state;

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
