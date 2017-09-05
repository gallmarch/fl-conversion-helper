const CATEGORY_VISIBILITY_CHANGED = 'CATEGORY_VISIBILITY_CHANGED';

function setCategoryVisibility({ category, visible }) {
  return (dispatch) => {
    // Dispatch an action (to update UI)
    dispatch({ type: CATEGORY_VISIBILITY_CHANGED, payload: { category, visible } });

    // Update storage
    const storage = chrome.storage.sync || chrome.storage.local;
    storage.get(null, ({ preferences }) => {
      storage.set({
        preferences: {
          ...preferences,
          visibilities: {
            ...preferences.visibilities,
            [category]: visible,
          },
        },
      });
    });
  }
}

export {
  CATEGORY_VISIBILITY_CHANGED,
  setCategoryVisibility,
};
