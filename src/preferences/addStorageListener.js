import { PREFERENCES_CHANGED } from './constants';

// Listen for changes to local storage and dispatch an action
// to update the UI
export default function addStorageListener({ store }) {
  chrome.storage.onChanged.addListener((changes) => {
    const { preferences } = changes;
    if (preferences === undefined) {
      return;
    }
    const { newValue } = preferences;
    store.dispatch({ type: PREFERENCES_CHANGED, payload: newValue });
  });
}
