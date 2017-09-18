const CATEGORY_EXPANSION_CHANGED = 'CATEGORY_EXPANSION_CHANGED';

function setCategoryExpansion({ category, expanded }) {
  return (dispatch) => {
    // Dispatch an action
    dispatch({ type: CATEGORY_EXPANSION_CHANGED, payload: { category, expanded } });

    // Update storage
    const storage = chrome.storage.sync || chrome.storage.local;
    storage.get(null, ({ preferences }) => {
      storage.set({
        preferences: {
          ...preferences,
          expansions: { ...preferences.expansions, [category]: expanded },
          visibilities: { ...preferences.visibilities, [category]: expanded },
        },
      });
    });
  };
}


export {
  CATEGORY_EXPANSION_CHANGED,
  setCategoryExpansion,
};
