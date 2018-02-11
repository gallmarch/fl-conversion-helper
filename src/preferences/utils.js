/* eslint-disable import/prefer-default-export */
import { DEFAULT_PREFERENCES, PREFERENCES_CHANGED } from './constants';

// Loading preferences kicks everything off; if we have pre-existing
// preferences, then we'll dispatch an action to tell the UI what it
// should display; if not, then we are probably at first run, in which
// case we'll populate the preferences with our defaults.
export function loadPreferences({ store, storage }) {
  // Retrieve preferences
  storage.get(null, ({ preferences }) => {
    // Check whether we have stored preferences. If not, then storage
    // is empty, so insert default preferences into storage (which
    // should trigger a storage changed event)
    if (preferences === undefined) {
      const defaultPreferences = DEFAULT_PREFERENCES;
      storage.set({ preferences: defaultPreferences });
      return;
    }
    // If we have preferences, dispatch an action so that the UI knows
    // how to present itself
    store.dispatch({ type: PREFERENCES_CHANGED, payload: preferences });
  });
}
