// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import MutationSummary from 'mutation-summary';

// eslint-disable-next-line no-unused-vars
import styles from './styles.scss';
import reducer from './reducer';
import Extension from './Extension';
import { loadPreferences } from './preferences/utils';
import {
  listenForAttributeChanges,
  listenForInventorySectionAddition,
  listenForStorageChanges,
} from './listeners';

// Import constants
import { WATCHFUL, SHADOWY, DANGEROUS, PERSUASIVE } from './attributes';
import { DEFAULT_PREFERENCES, PREFERENCES_CHANGED } from './preferences';

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
