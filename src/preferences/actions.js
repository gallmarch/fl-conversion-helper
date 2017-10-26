import { DEFAULT_PREFERENCES } from './constants';

const CATEGORY_EXPANSION_CHANGED = 'CATEGORY_EXPANSION_CHANGED';

function setCategoryExpansion({ category, expanded }) {
  return (dispatch) => {
    console.info(`Creating an action for category ${category} with expanded: ${expanded}`);
    // Dispatch an action
    dispatch({ type: CATEGORY_EXPANSION_CHANGED, payload: { category, expanded } });

    // Update storage
    const storage = chrome.storage.sync || chrome.storage.local;
    storage.get(null, (stuff) => {
      console.info(`After creating an action, I have received changes that look like this`);
      console.info(stuff);
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


export {
  CATEGORY_EXPANSION_CHANGED,
  setCategoryExpansion,
};
