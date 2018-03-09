import MutationSummary from 'mutation-summary';
import {
  DANGEROUS,
  PERSUASIVE,
  WATCHFUL,
  SHADOWY,
} from '../attributes';
import { log } from '../util';

// Here we're adding a MutationSummary that listens the left-hand column for
// changes. These happen quite frequently (largely because the timer, which
// updates once per second, shares the same parent element as the attribute
// containers), but we're only interested in the WSDP attribute elements.
// Whenever they change we'll update application state accordingly.
//
// The reason to listen for attribute changes is that the user may switch outfits
// or gear while they're inside the Myself tab, in order to meet attribute
// requirements for Favour -> Renown conversions, and we want the faction
// item category to update itself to reflect this without forcing the user
// to tab away and back.
export default function listenForAttributeChanges({ store, isLegacy = true }) {
  const rootNode = document.querySelector(getRootNodeSelector({ isLegacy }));
  const queries = [{ element: getElementQueries({ isLegacy }) }];
  return new MutationSummary({
    rootNode,
    queries,
    callback: createCallback({ document, isLegacy, store }),
  });
}

export function createCallback({ document, isLegacy, store }) {
  log(`Creating callback with isLegacy=${isLegacy}`);
  if (isLegacy) {
    return () => {
      // Retrieve modified WSDP attribute values (i.e., gear effects included) and build a
      // dictionary
      const attributes = [WATCHFUL, SHADOWY, DANGEROUS, PERSUASIVE].reduce((acc, attributeID) => {
        const attributeValue = getAttributeValueFromDOM({ attributeID, document });
        if (attributeValue) {
          return { ...acc, [attributeID]: attributeValue };
        }
        return acc;
      }, {});
      // We have our dict; dispatch an action so that the faction item category can
      // update itself
      store.dispatch({ type: 'ATTRIBUTES', payload: attributes });
    };
  }
  return () => {
    log('Running new callback');
  };
}


export function getAttributeValueFromDOM({ attributeID, document, isLegacy }) {
  if (isLegacy) {
    // The *modified* attribute is only found inside the tooltip that we get when
    // hovering over the attribute's icon, so we'll do a regexp search for a numeric
    // string inside it.
    const tooltipText = document.querySelector(`div#infoBarQImage${attributeID}`)
      .nextSibling
      .firstChild
      .innerText;
    const match = /[0-9]+/.exec(tooltipText);
    if (match) {
      return Number(match[0]);
    }
    return undefined;
  }
  throw new Error('Not implemented for non-legacy; waiting for beta');
}

function getElementQueries({ isLegacy }) {
  if (isLegacy) {
    return 'ul.you_icon';
  }
  return '*';
}

// Get the CSS selector for the root node that we should be watching for changes
export function getRootNodeSelector({ isLegacy  }) {
  if (isLegacy) {
    return 'div#lhs_col';
  }
  return '.content.container .col-secondary';
}
