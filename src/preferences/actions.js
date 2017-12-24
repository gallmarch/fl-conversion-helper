import { DEFAULT_PREFERENCES } from './constants';

const CATEGORY_EXPANSION_CHANGED = 'CATEGORY_EXPANSION_CHANGED';
const ENABLEMENT_CHANGED = 'preferences/ENABLEMENT_CHANGED';

function setCategoryExpansion({ category, expanded }) {
  return (dispatch) => {
    // Dispatch an action
    dispatch({ type: CATEGORY_EXPANSION_CHANGED, payload: { category, expanded } });

    // Update storage
    const storage = chrome.storage.local;
    storage.get(null, (stuff) => {
      const { preferences } = stuff;
      if (preferences === null || preferences === undefined) {
        return storage.set(DEFAULT_PREFERENCES);
      }
      return storage.set({
        preferences: {
          ...preferences,
          expansions: { ...preferences.expansions, [category]: expanded },
        },
      });
    });
  };
}

function setEnablement({ which, value }) {
  return (dispatch) => {
    // Dispatch an action
    dispatch({ type: ENABLEMENT_CHANGED, payload: { which, value } });
    storage.get(null, (stuff) => {
      const { preferences } = stuff;
      if (preferences === null || preferences === undefined) {
        return storage.get(DEFAULT_PREFERENCES);
      }
      return storage.set({
        preferences: {
          ...preferences,
          enablements: { ...preferences.enablements, [which]: value },
        },
      });
    });
  };
}

export {
  CATEGORY_EXPANSION_CHANGED,
  ENABLEMENT_CHANGED,
  setCategoryExpansion,
};
