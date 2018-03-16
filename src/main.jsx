// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
import axios from 'axios';
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
import addAuthListener from './auth/addAuthListener';

log('Checking for version');
if (isLegacy()) {
  log('This is the legacy version');
} else {
  log('This is the new version');
}

// Create the store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

addAuthListener({ store });

// Get a reference to (our) localStorage
const storage = chrome.storage.local;

// log(chrome.webRequest);

// Set up MutationSummaries that dispatch actions
// listenForAttributeChanges({ store, isLegacy: isLegacy() });
// listenForInventorySectionAddition({ store, isLegacy: isLegacy() });

// Listen for storage changes
// listenForStorageChanges({ store });

// Load expansion preferences
loadPreferences({ storage, store });
