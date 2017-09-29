import { DEFAULT_PREFERENCES } from './constants';
const CATEGORY_EXPANSION_CHANGED = 'CATEGORY_EXPANSION_CHANGED';

function setCategoryExpansion({ category, expanded }) {
  return (dispatch) => {
    // Dispatch an action
    dispatch({ type: CATEGORY_EXPANSION_CHANGED, payload: { category, expanded } });

    // Update storage
    const storage = chrome.storage.sync || chrome.storage.local;
    storage.get(null, ({ preferences }) => {
      // If we don't have a preferences object, then
      // just set the default preferences
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


export {
  CATEGORY_EXPANSION_CHANGED,
  setCategoryExpansion,
};
