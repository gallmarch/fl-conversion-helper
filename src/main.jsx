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
import { DEFAULT_PREFERENCES, PREFERENCES_CHANGED } from './preferences';

const storage = chrome.storage.sync || chrome.storage.local;

// Create the store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// Set up MutationSummaries that dispatch actions
watchForAttributeChanges();
watchForInventorySectionAddition();

// Listen for storage changes
listenForStorageChanges();
// Load expansion preferences
loadPreferences();

// Listen for changes to local storage and dispatch an action
// to update the UI
function listenForStorageChanges() {
  chrome.storage.onChanged.addListener((changes) => {
    const { preferences } = changes;
    if (preferences === undefined) {
      return;
    }
    const { newValue } = preferences;
    store.dispatch({ type: PREFERENCES_CHANGED, payload: newValue });
  });
}

// Loading preferences kicks everything off; if we have pre-existing
// preferences, then we'll dispatch an action to tell the UI what it
// should display; if not, then we are probably at first run, in which
// case we'll populate the preferences with our defaults.
function loadPreferences() {
  // Retrieve preferences
  storage.get(null, ({ preferences }) => {
    // Check whether we have stored preferences. If not, then storage
    // is empty, so insert default preferences into storage (which
    // should trigger a storage changed event)
    if (preferences === undefined) {
      const defaultPreferences = DEFAULT_PREFERENCES;
      return storage.set({ preferences: defaultPreferences });
    }
    // If we have preferences, dispatch an action so that the UI knows
    // how to present itself
    store.dispatch({ type: PREFERENCES_CHANGED, payload: preferences });
  });
}

// Here we're adding a MutationSummary that watches the left-hand column for
// changes. These happen quite frequently (largely because the timer, which
// updates once per second, shares the same parent element as the attribute
// containers), but we're only interested in the WSDP attribute elements.
// Whenever they change we'll update application state accordingly.
//
// The reason to watch for attribute changes is that the user may switch outfits
// or gear while they're inside the Myself tab in order to meet attribute
// requirements for Favour -> Renown conversions, and we want the faction
// item category to update itself to reflect this without forcing the user
// to tab away and back.
function watchForAttributeChanges() {
  const rootNode = document.querySelector('div#lhs_col');
  const queries = [{ element: 'ul.you_icon' }];
  return new MutationSummary({
    rootNode,
    queries,
    callback,
  });

  function callback() {
    // Retrieve modified WSDP attribute values (i.e., gear effects included) and build a
    // dictionary
    const attributes = [WATCHFUL, SHADOWY, DANGEROUS, PERSUASIVE].reduce((acc, attributeID) => {
      // The *modified* attribute is only found inside the tooltip that we get when
      // hovering over the attribute's icon, so we'll do a regexp search for a numeric
      // string inside it.
      const tooltipText = document.querySelector(`div#infoBarQImage${attributeID}`)
        .nextSibling
        .firstChild
        .innerText;
      const match = /[0-9]+/.exec(tooltipText);
      if (match) {
        // If we found a match, then 
        return { ...acc, [attributeID]: Number(match[0]) };
      }
      return acc;
    }, {});
    // We have our dict; dispatch an action so that the faction item category can
    // update itself
    store.dispatch({ type: 'ATTRIBUTES', payload: attributes });
  }
}

// Insert the conversion-helper elements when we detect that the
// Myself tab has just been loaded. Our only clue to this is that
// the tab has a <div class="you_bottom_rhs"> that no other tab
// has, so we'll watch for when a matching element is *added* to
// the page and load our UI.
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
      // Create a container element and insert it into the DOM
      const container = createAndInsertContainerElement();

      // Render our extension UI inside the container element
      ReactDOM.render(
        <Provider store={store}>
          <Extension />
        </Provider>,
        container,
      );
    }
  }

  function createAndInsertContainerElement() {
    // Get the parent element for our outer container
    const parent = document.querySelector('div.you_bottom_rhs');
    // Find the element before which we should insert our container
    // element: in this case it's the first <h3> element
    // (FL categories aren't in containers of their own)
    const referenceNode = parent.querySelector('h3:first-of-type');
    // Insert and return the element
    return parent.insertBefore(document.createElement('div'), referenceNode);
  }
}
