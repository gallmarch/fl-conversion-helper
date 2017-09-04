import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import MutationSummary from 'mutation-summary';

import styles from './styles.scss';
import reducer from './reducer';
import Extension from './Extension';

import { WATCHFUL, SHADOWY, DANGEROUS, PERSUASIVE } from './attributes';

// Create the store
const store = applyMiddleware(reduxThunk)(createStore)(reducer);

// MutationSummaries that dispatch actions
watchForAttributeChanges();
watchForInventorySectionAddition();

// Listen for storage changes
listenForStorageChanges();

function listenForStorageChanges() {
  chrome.storage.onChanged.addListener(({ options }) => {
    console.info('detected change');
    if (!options) {
      return;
    }
    const { newValue } = options;
    console.info('preference change');
    console.info(newValue);
  });
}

function watchForAttributeChanges() {
  const rootNode = document.querySelector('div#lhs_col');
  const queries = [{ element: 'ul.you_icon' }];
  new MutationSummary({
    rootNode,
    queries,
    callback,
  });

  function callback(summaries) {
    const summary = summaries[0];
    console.info('you_icon p change');
    // Retrieve modified stats from the LHS col attribute's tooltip
    const attributes = [WATCHFUL, SHADOWY, DANGEROUS, PERSUASIVE].reduce((acc, attributeID) => {
      const tooltipText = document.querySelector(`div#infoBarQImage${attributeID}`)
      .nextSibling
      .firstChild
      .innerText;
      const match = /[0-9]+/.exec(tooltipText);
      if (match) {
        console.info(match[0]);
        return { ...acc, [attributeID]: Number(match[0]) };
      }
    }, {});
    console.info('attributes');
    // console.info(attributes);
    store.dispatch({ type: 'ATTRIBUTES', payload: attributes });
  }
}

function watchForInventorySectionAddition() {
  const rootNode = document.querySelector('div.tab_content');
  const queries = [{ element: 'div.you_bottom_rhs' }];

  new MutationSummary({
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
        container
      );
    }
  }
}

function createContainerElement() {
  const parent = document.querySelector('div.you_bottom_rhs');
  const referenceNode = parent.querySelector('h3:first-of-type');
  return parent.insertBefore(document.createElement('div'), referenceNode);
}
