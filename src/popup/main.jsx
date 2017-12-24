import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducer';
import Popup from './Popup';

import { DEFAULT_PREFERENCES } from '../preferences';

/*
 * This is the app that runs the popup in the browser chrome.
 * It runs independently from the content script; because the
 * structure of the stored preferences is the same, though,
 * we can share the default structure.
 */

// Get a reference to whatever local storage is available
const storage = chrome.storage.local;

// Create the Redux store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// Retrieve options from storage
listenForStorageChanges();
loadAndStorePreferences();

// Render the popup window
const container = document.querySelector('#react-container');
ReactDOM.render(
  (<Provider store={store}>
    <Popup />
  </Provider>),
  container,
);

// Whenever we detect a storage change, dispatch an action
function listenForStorageChanges() {
  chrome.storage.onChanged.addListener(({ preferences: { newValue } }) => {
    store.dispatch({ type: 'PREFERENCES_CHANGE', payload: newValue });
  });
}

// Load preferences from storage, and then save them again, ensuring that
// the structure is valid for our purposes (this should prevent the extension
// from getting upset when the user updates).
function loadAndStorePreferences() {
  storage.get(null, ({ preferences }) => {
    // Extract the existing expansion and visibility preferences from
    // the stored preferences, if they exist
    const expansions = (preferences && preferences.expansions) || {};
    const visibilities = (preferences && preferences.visibilities) || {};
    const enablements = (preferences && preferences.enablements) || {};
    const defaults = DEFAULT_PREFERENCES;

    // Build a guaranteed-valid object using existing prefs and defaults
    const preferencesWithDefaults = {
      ...defaults,
      ...preferences,
      expansions: { ...defaults.expansions, ...expansions },
      visibilities: { ...defaults.visibilities, ...visibilities },
      enablements: { ...defaults.enablements, ...enablements },
    };

    // Dispatch an action
    store.dispatch({ type: 'PREFERENCES_CHANGE', payload: preferencesWithDefaults });

    // Store preferences immediately (this puts defaults into storage if
    // there was nothing there to start with)
    storage.set({
      preferences: preferencesWithDefaults,
    });
  });
}
