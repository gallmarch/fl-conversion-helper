import $ from 'jquery';

import * as factions from '../factions';
import renownIDs from '../factions/renown';
import favourIDs from '../factions/favours';

function fetchConnectedQualities() {
  // TODO: see if the Fetch api is actually up to the task of
  // handling this when we're calling from a web extension
  const url = '/Me/StatusesForCategory?category=Contacts';
  const datatype = 'html';
  return $.ajax({ url, datatype });
}


function parseConnectedQualities(response) {
  // JQuery lets us find elements by children's IDs
  const $el = $(response);

  // Get the Renown and Favours values for each faction
  const renown = findMatches(renownIDs);
  const favours = findMatches(favourIDs);
  return { renown, favours };

  function findMatches(ids) {
    return Object.keys(factions).reduce((acc, faction) => {
      // Find the favour or renown ID corresponding to this faction
      const id = ids[factions[faction]];
      // Find the text of the corresponding element
      const text = $el.children().has(`div#infoBarQImage${id}`).text();
      // Search for a number
      const match = /[^0-9]*([0-9]+)/.exec(text);
      if (match) {
        return {...acc, [factions[faction]]: Number(match[1])};
      }
      return acc;
    }, {});
  }
}

export default function fetchAndParseConnectedQualities() {
  return fetchConnectedQualities()
  .then(parseConnectedQualities);
}
