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

// Import constants
import { WATCHFUL, SHADOWY, DANGEROUS, PERSUASIVE } from './attributes';
import { PREFERENCES_CHANGED } from './preferences';

const storage = chrome.storage.sync || chrome.storage.local;

// Create the store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// MutationSummaries that dispatch actions
watchForAttributeChanges();
watchForInventorySectionAddition();

// Load expansion preferences
loadPreferences();
// Listen for storage changes
listenForStorageChanges();

function listenForStorageChanges() {
  // Listen for changes to local storage and dispatch an action
  // to update the UI
  chrome.storage.onChanged.addListener(({ preferences }) => {
    const { newValue } = preferences;
    store.dispatch({ type: PREFERENCES_CHANGED, payload: newValue });
  });
}

function loadPreferences() {
  // Retrieve preferences and dispatch an action
  storage.get(null, ({ preferences }) => {
    store.dispatch({ type: PREFERENCES_CHANGED, payload: preferences });
  });
}

function watchForAttributeChanges() {
  const rootNode = document.querySelector('div#lhs_col');
  const queries = [{ element: 'ul.you_icon' }];
  return new MutationSummary({
    rootNode,
    queries,
    callback,
  });

  function callback() {
    // Retrieve modified stats from the LHS col attribute's tooltip
    const attributes = [WATCHFUL, SHADOWY, DANGEROUS, PERSUASIVE].reduce((acc, attributeID) => {
      const tooltipText = document.querySelector(`div#infoBarQImage${attributeID}`)
        .nextSibling
        .firstChild
        .innerText;
      const match = /[0-9]+/.exec(tooltipText);
      if (match) {
        return { ...acc, [attributeID]: Number(match[0]) };
      }
      return acc;
    }, {});
    store.dispatch({ type: 'ATTRIBUTES', payload: attributes });
  }
}

function watchForInventorySectionAddition() {
  const rootNode = document.querySelector('div.tab_content');
  const queries = [{ element: 'div.you_bottom_rhs' }];

  return new MutationSummary({
    rootNode,
    queries,
    callback,
  });

  function callback(summaries) {
    const summary = summaries[0];
    // Only proceed if the element has been added: this is our cue that
    // we're entering the tab
    if (summary.added.length) {
      // Create a container element
      const container = createContainerElement();

      // Render our extension UI inside the container element
      ReactDOM.render(
        <Provider store={store}>
          <Extension />
        </Provider>,
        container,
      );
    }
  }

  function createContainerElement() {
    const parent = document.querySelector('div.you_bottom_rhs');
    const referenceNode = parent.querySelector('h3:first-of-type');
    return parent.insertBefore(document.createElement('div'), referenceNode);
  }
}
