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


const storage = chrome.storage.local;

// Create the store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// Set up MutationSummaries that dispatch actions
listenForAttributeChanges({ store });
listenForInventorySectionAddition({ store });

// Listen for storage changes
listenForStorageChanges({ store });

// Load expansion preferences
loadPreferences({ storage, store });
