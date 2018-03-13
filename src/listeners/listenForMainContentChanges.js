import MutationSummary from 'mutation-summary';
import { log } from '../util';
import insertExtension from './insertExtension';
import insertNav from './insertNav';

export default function listenForMainContentChanges({ store }) {
  log('Listening for changes to main content');
  const queries = [{ element: '*' }];
  const rootNode = document.querySelector('div.content.container');
  const callback = createCallback({ store });
  new MutationSummary({
    callback,
    queries,
    rootNode,
  });
}

function createCallback({ store }) {
  return function(summary) {
    log('Change to div.content.container detected');
    const header = document.querySelector('h1.heading');
    if (!header) {
      return;
    }
    if (header.innerText.trim() === 'My Possessions') {
      // Showtime
      log('On the my possessions page');
      if (!document.querySelector('#flch-nav-root')) {
        insertExtension({ store });
        insertNav({ store });
      }
    }
  }
}
