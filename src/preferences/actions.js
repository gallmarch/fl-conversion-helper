function setCategoryExpansion({ category, expanded }) {
  return (dispatch) => {
    const storage = chrome.storage.sync || chrome.storage.local;
    storage.get(null, ({ preferences }) => {
      storage.set({
        preferences: {
          ...preferences,
          expansions: {
            ...preferences.expansions,
            [category]: expanded,
          },
        },
      });
    });
  };
}

function setCategoryVisibility({ category, visible }) {
  return (dispatch) => {
    console.info('Setting preferences...');
    console.info(category, visible);
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
  setCategoryExpansion,
  setCategoryVisibility,
};
