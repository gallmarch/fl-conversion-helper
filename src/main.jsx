// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// eslint-disable-next-line no-unused-vars
import styles from './styles.scss';
import reducer from './reducer';
import { loadPreferences } from './preferences/utils';
import {
  listenForAttributeChanges,
  listenForInventorySectionAddition,
  listenForStorageChanges,
} from './listeners';
import { isLegacy, log } from './util';

log('Checking for version');
if (isLegacy()) {
  log('This is the legacy version');
} else {
  log('This is the new version');
}

// Get a reference to localStorage
const storage = chrome.storage.local;

// Create the store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// Listen for info from our background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  log(`request incoming`);
  console.info(request);
  const { page } = request;
  if (!page) {
    return;
  }
  switch (page) {
    case 'possessions':
      onPossessionsLoaded();
  }
});

function onPossessionsLoaded() {
  console.info(document.querySelectorAll('.stack-content'));
}

// log(chrome.webRequest);

// Set up MutationSummaries that dispatch actions
// listenForAttributeChanges({ store, isLegacy: isLegacy() });
// listenForInventorySectionAddition({ store, isLegacy: isLegacy() });

// Listen for storage changes
// listenForStorageChanges({ store });

// Load expansion preferences
loadPreferences({ storage, store });
