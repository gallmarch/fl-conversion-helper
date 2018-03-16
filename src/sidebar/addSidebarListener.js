import MutationSummary from 'mutation-summary';

import { ATTRIBUTES_UPDATED } from './types';

export default function addSidebarListener({ store }) {
  const queries = [{ element: '*' }, { characterData: true }];
  const rootNode = document.querySelector('div.col-secondary');
  return new MutationSummary({
    queries,
    rootNode,
    callback,
  });

  function callback() {
    return readAttributes()(store.dispatch);
  }
}

export function readAttributes() {
  return (dispatch) => {
    const WATCHFUL = 'Watchful';
    const SHADOWY = 'Shadowy';
    const DANGEROUS = 'Dangerous';
    const PERSUASIVE = 'Persuasive';

    // Pull attribute values from the DOM
    const attributes = [...document.querySelectorAll('.col-secondary .js-item-name')].reduce((acc, el) => {
      const name = el.innerText.trim();
      if ([DANGEROUS, PERSUASIVE, SHADOWY, WATCHFUL].includes(name)) {
        const baseValue = el.nextElementSibling.innerText;
        const modifier = el.nextElementSibling.nextElementSibling.innerText;
        return { ...acc, [name]: Number(baseValue) + Number(modifier) };
      }
      return acc;
    }, {});

    // Dispatch an action
    dispatch({ type: ATTRIBUTES_UPDATED, payload: attributes });
  }
}
