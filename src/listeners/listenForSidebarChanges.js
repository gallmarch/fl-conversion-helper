import MutationSummary from 'mutation-summary';

import { log } from '../util';

const WATCHFUL = 'Watchful';
const PERSUASIVE = 'Persuasive';
const SHADOWY = 'Shadowy';
const DANGEROUS = 'Dangerous';

export default function listenForSidebarChanges({ store }) {
  log('listening for sidebar changes');
  const rootNodeSelector = 'div.content.container';
  const rootNode = document.querySelector(rootNodeSelector);
  const queries = [{ element: '*' }];
  const callback = createCallback({ store, rootNodeSelector });

  new MutationSummary({
    rootNode,
    queries,
    callback,
  });
}

export function createCallback({ store, rootNodeSelector }) {
  return function(summary) {
    [...document.querySelector(rootNodeSelector).querySelectorAll('.js-item-name.item__name')]
      .forEach((element) => {
        handleElement({ element, store });
      });
  }
}

export function handleElement({ element, store }) {
  if (!element.innerText) {
    return;
  }

  const name = element.innerText.trim();

  switch (name) {
    case DANGEROUS:
    case WATCHFUL:
    case SHADOWY:
    case PERSUASIVE:
      // Get attribute value
      const value = Number(element.nextElementSibling.innerText);
      store.dispatch({ type: 'ATTRIBUTES', payload: { [name]: value } });
      break;
    default:
      break;
  }

}
