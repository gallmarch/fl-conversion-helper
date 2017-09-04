import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducer';
import Popup from './Popup';

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
    console.info('popup: storage changes detected');
    console.info(newValue);
    store.dispatch({ type: 'PREFERENCES_CHANGE', payload: newValue });
  });
}

function loadPreferences() {
  storage.get(null, ({ preferences }) => {
    // If we have something stored, set our checkboxes
    // if (options) {
      // store.dispatch({ type: 'PREFERENCES_CHANGE', payload: options });
    // }

    console.info('I have loaded');
    console.info(preferences);
    const categories = (preferences && preferences.categories) || {};

    const defaults = {
      categories: {
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
      categories: { ...defaults.categories, ...categories },
    };

    store.dispatch({ type: 'PREFERENCES_CHANGE', payload: preferencesWithDefaults });

    // Store preferences immediately (this puts defaults into storage)
    storage.set({
      preferences: preferencesWithDefaults,
    });
  });
}
