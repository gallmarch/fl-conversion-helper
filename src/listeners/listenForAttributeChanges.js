import MutationSummary from 'mutation-summary';
import {
  DANGEROUS,
  PERSUASIVE,
  WATCHFUL,
  SHADOWY,
} from '../attributes';

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
export default function listenForAttributeChanges({ store, isLegacy=true }) {
  const rootNode = document.querySelector(getRootNodeSelector({ isLegacy }));
  const queries = [{ element: 'ul.you_icon' }];
  return new MutationSummary({
    rootNode,
    queries,
    callback: callback({ document, store }),
  });
}

export function callback({ document, store }) {
  return function generatedCallback() {
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

export function getAttributeValueFromDOM({attributeID, document, isLegacy=true }) {
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
  throw new Error({ message: 'Not implemented for non-legacy; waiting for beta' });
}

export function getRootNodeSelector({ isLegacy = true }) {
  if (isLegacy) {
    return 'div#lhs_col';
  }
  // TODO: Check the new front-end for a selector
  throw new Error({ message: 'The new front-end isn\'t supported yet.' });
}
