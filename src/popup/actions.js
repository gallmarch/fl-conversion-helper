const CATEGORY_VISIBILITY_CHANGED = 'CATEGORY_VISIBILITY_CHANGED';

// When we make a change in the popup, update the storage accordingly.
// The content script is listening for storage changes, so it'll pick
// up on this and change how it renders the categories accordingly.
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
  };
}

export {
  CATEGORY_VISIBILITY_CHANGED,
  setCategoryVisibility,
};
