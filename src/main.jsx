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
import addPossessionsListener, { onBodyChange } from './possessions/addPossessionsListener';
import addSidebarListener, { readAttributes } from './sidebar/addSidebarListener';
import addStorageListener from './preferences/addStorageListener';

log('Checking for version');
if (isLegacy()) {
  log('This is the legacy version');
} else {
  log('This is the new version');
}

// Create the store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// Get a reference to (our) localStorage
const storage = chrome.storage.local;
// Load expansion preferences
loadPreferences({ storage, store });

// Try and load things available on page load
readAttributes()(store.dispatch);
onBodyChange({ store });

addAuthListener({ store });
addPossessionsListener({ store });
addSidebarListener({ store });
addStorageListener({ store });
