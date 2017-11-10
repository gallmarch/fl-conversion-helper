import $ from 'jquery';

import * as factions from '../factions';
import renownIDs from '../factions/renown';
import favourIDs from '../factions/favours';

function fetchConnectedQualities() {
  // TODO: see if the Fetch API is actually up to the task of
  // handling this when we're calling from a web extension. It
  // sort of seems like overkill to bundle JQuery just to make
  // a call like this (but axios' code contains calls to eval()
  // that cause it to fail Mozilla's validation).
  const url = '//fallenlondon.storynexus.com/Me/StatusesForCategory?category=Contacts';
  const datatype = 'html';
  return $.ajax({ url, datatype });
}

// Given the HTML response from the server, do some DOM searching
// and return Renown and Favours in a format that we can use
function parseConnectedQualities(response) {
  // JQuery lets us find elements by children's IDs, which is a pain
  // otherwise.
  const $el = $(response);

  // Get the Renown and Favours values for each faction
  const renown = findMatches(renownIDs);
  const favours = findMatches(favourIDs);
  return { renown, favours };

  function findMatches(ids) {
    return Object.keys(factions).reduce((acc, faction) => {
      // Find the favour or renown ID corresponding to this faction
      const id = ids[factions[faction]];
      // Find the text of the corresponding element (this is why we 
      // need JQuery)
      const text = $el.children().has(`div#infoBarQImage${id}`).text();
      // Search for a number
      const match = /[^0-9]*([0-9]+)/.exec(text);
      // If we get one, that's the value for the quality we're looking
      // for
      if (match) {
        return { ...acc, [factions[faction]]: Number(match[1]) };
      }
      // If we don't find a number, then the quality = 0 (the response
      // doesn't contain values for qualities at 0)
      return { ...acc, [factions[faction]]: 0 };
    }, {});
  }
}

export default function fetchAndParseConnectedQualities() {
  return fetchConnectedQualities()
    .then(parseConnectedQualities);
}
