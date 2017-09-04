function setCategory({ category, visible }) {
  return (dispatch) => {
    console.info('Setting preferences...');
    console.info(category, visible);
    const storage = chrome.storage.sync || chrome.storage.local;
    storage.get(null, ({ preferences }) => {
      storage.set({
        preferences: {
          ...preferences,
          categories: {
            ...preferences.categories,
            [category]: visible,
          },
        },
      });
    });
  }
}

export {
  setCategory,
};
