import MutationSummary from 'mutation-summary';

import { insertCategories, insertMenuItems } from './insertComponents';

export default function addPossessionsListener({ store }) {
  const rootNode = document.querySelector('body');
  const queries = [{ element: '*' }, { characterData: true }];

  return new MutationSummary({
    rootNode,
    queries,
    callback: () => onBodyChange({ store }),
  });
}

export function onBodyChange({ store }) {
  // If we're not on the possessions page (or not there yet), then return
  if (!document.querySelector('.possessions__lodgings-and-equipped')) {
    return;
  }
  // If we've already inserted the container, then return
  if (document.querySelector('.flch-sidebar-container')) {
    return;
  }
  // console.info('Inserting menu items');
  if (document.querySelector('main nav')) {
    insertMenuItems({ store });
  }
  if (document.querySelector('.flch-content-container')) {
    return;
  }
  insertCategories({ store });
}
