const CATEGORY_VISIBILITY_CHANGED = 'CATEGORY_VISIBILITY_CHANGED';
const ENABLEMENT_PREFERENCE_CHANGED = 'ENABLEMENT_PREFERENCE_CHANGED';

// When we make a change in the popup, update the storage accordingly.
// The content script is listening for storage changes, so it'll pick
// up on this and change how it renders the categories accordingly.
function setCategoryVisibility({ category, visible }) {
  return (dispatch) => {
    // Dispatch an action (to update UI)
    dispatch({ type: CATEGORY_VISIBILITY_CHANGED, payload: { category, visible } });

    // Update storage
    const storage = chrome.storage.local;
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

function setEnablementPreference({ name, value }) {
  return (dispatch) => {
    console.info(`setting enablement preference ${name} => ${value}`);
    // Dispatch an action (to update UI)
    dispatch({ type: ENABLEMENT_PREFERENCE_CHANGED, payload: { name, value } });

    // Update storage
    const storage = chrome.storage.local;
    storage.get(null, ({ preferences }) => {
      storage.set({
        preferences: {
          ...preferences,
          enablements: {
            ...preferences.enablements,
            [name]: value,
          },
        },
      });
    });
  };
}

export {
  CATEGORY_VISIBILITY_CHANGED,
  setCategoryVisibility,
  setEnablementPreference,
};
