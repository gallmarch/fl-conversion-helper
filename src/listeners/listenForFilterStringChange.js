import MutationSummary from 'mutation-summary';
import { log } from '../util';

import { FILTER_STRING_CHANGED } from '../possessions/types';

export default function listenForFilterStringChange({ store }) {
  const rootNode = document.querySelector('.content col-primary');
  const queries = [{ element: '.input--item-search '}];
  log('setting up filterstring listener');
  return new MutationSummary({
    rootNode,
    queries,
    callback: callback({ store }),
  });
}

function callback({ store }) {
  return (summaries) => {
    if (summaries[0].added.length) {
      // Reset our internal record of the filter string, so that it isn't
      // preserved between tab switches
      store.dispatch({ type: FILTER_STRING_CHANGED, payload: '' });
      const el = document.querySelector('.input--item-search');
      el.addEventListener('input', (e) => {
        store.dispatch({ type: FILTER_STRING_CHANGED, payload: e.target.value });
      });
    }
  };
}
