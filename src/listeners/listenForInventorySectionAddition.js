import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MutationSummary from 'mutation-summary';

import Extension from '../Extension';
import insertExtension from './insertExtension';

// Insert the conversion-helper elements when we detect that the
// Myself tab has just been loaded. Our only clue to this is that
// the tab has a <div class="you_bottom_rhs"> that no other tab
// has, so we'll watch for when a matching element is *added* to
// the page and load our UI.
export default function listenForInventorySectionAddition({ store }) {
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
      insertExtension({ store });
    }
  }
}
