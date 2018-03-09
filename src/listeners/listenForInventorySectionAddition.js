import MutationSummary from 'mutation-summary';
import insertExtension from './insertExtension';
import { UnsupportedError } from '../errors';
import { log } from '../util';

// Insert the conversion-helper elements when we detect that the
// Myself tab has just been loaded. Our only clue to this is that
// the tab has a <div class="you_bottom_rhs"> that no other tab
// has, so we'll watch for when a matching element is *added* to
// the page and load our UI.
export default function listenForInventorySectionAddition({ store, isLegacy  }) {
  const rootNode = document.querySelector(getRootNodeSelector(isLegacy));
  const queries = [{ element: getElementSelector(isLegacy) }];

  return new MutationSummary({
    rootNode,
    queries,
    callback: callback({ store, isLegacy }),
  });
}

export function callback({ store, isLegacy }) {
  return function generatedCallback(summaries) {
    const summary = summaries[0];
    // Only proceed if the element has been added: this is our cue that
    // we're entering the tab
    if (summary.added.length) {
      insertExtension({ store, isLegacy });
    }
  };
}

function getRootNodeSelector(isLegacy) {
  if (isLegacy) {
    return 'div.tab_content';
  }
  return '.content .col-primary';
}

function getElementSelector(isLegacy) {
  if (isLegacy) {
    return 'div.you_bottom_rhs';
  }
  return '.stack-content';
}
