import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducer';
import Popup from './Popup';

// Get a reference to whatever local storage is available
const storage = chrome.storage.sync || chrome.storage.local;

// Create the Redux store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// Retrieve options from storage
listenForStorageChanges();
loadPreferences();

// Render the popup window
const container = document.querySelector('#react-container');
ReactDOM.render((
  <Provider store={store}>
    <Popup />
  </Provider>
  ), container);

function listenForStorageChanges() {
  chrome.storage.onChanged.addListener(({ preferences: { newValue } }) => {
    store.dispatch({ type: 'PREFERENCES_CHANGE', payload: newValue });
  });
}

function loadPreferences() {
  storage.get(null, ({ preferences }) => {
    const expansions = (preferences && preferences.expansions) || {};
    const visibilities = (preferences && preferences.visibilities) || {};

    const defaults = {
      expansions: {
        tier1: false,
        tier2: false,
        tier3: false,
        tier4: false,
        faction: false,
      },
      visibilities: {
        tier1: true,
        tier2: true,
        tier3: true,
        tier4: true,
        faction: true,
      },
    };

    const preferencesWithDefaults = {
      ...defaults,
      ...preferences,
      expansions: { ...defaults.expansions, ...expansions },
      visibilities: { ...defaults.visibilities, ...visibilities },
    };

    store.dispatch({ type: 'PREFERENCES_CHANGE', payload: preferencesWithDefaults });

    // Store preferences immediately (this puts defaults into storage)
    storage.set({
      preferences: preferencesWithDefaults,
    });
  });
}
