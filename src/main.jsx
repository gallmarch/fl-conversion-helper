// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// noinspection ES6UnusedImports
import styles from './styles.scss'; // eslint-disable-line no-unused-vars
import reducer from './reducer';
import { loadPreferences } from './preferences/utils';
import { addAuthListener, makeCheckLocalStorage } from './auth';
import { listenForBackgroundMessages, listenForFilterStringChange } from './listeners';
import addPossessionsListener, { onBodyChange } from './possessions/addPossessionsListener';
import addSidebarListener, { readAttributes } from './sidebar/addSidebarListener';
import addStorageListener from './preferences/addStorageListener';

// Create the store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// Do an initial storage check for the auth token
makeCheckLocalStorage({ axios, store })();

// Get a reference to (our) localStorage
const storage = chrome.storage.local;

// Load expansion preferences
loadPreferences({ storage, store });

// Try and load things available on page load
readAttributes()(store.dispatch);
onBodyChange({ store });

// Add listeners
addAuthListener({ store });
addPossessionsListener({ store });
addSidebarListener({ store });
addStorageListener({ store });

listenForBackgroundMessages({ store });
listenForFilterStringChange({ store });
