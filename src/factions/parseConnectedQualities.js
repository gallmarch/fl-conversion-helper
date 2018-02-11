import $ from 'jquery';

import * as factions from '../factions';
import renownIDs from '../factions/renown';
import favourIDs from '../factions/favours';

// Given the HTML response from the server, do some DOM searching
// and return Renown and Favours in a format that we can use
export default function parseConnectedQualities(response) {
  // JQuery lets us find elements by children's IDs, which is a pain
  // otherwise.
  const $el = $(response);

  // Get the Renown and Favours values for each faction
  const renown = findMatches(renownIDs);
  const favours = findMatches(favourIDs);
  return { renown, favours };

  function findMatches(ids) {
    const { items, ...rest } = factions;
    return Object.keys(rest).reduce((acc, faction) => {
      // Find the favour or renown ID corresponding to this faction
      const id = ids[factions[faction]];
      // Find the text of the corresponding element (this is why we 
      // need JQuery)
      const text = $el.children().has(`div#infoBarQImage${id}`).text();
      // Search for a number
      const match = /[^0-9]*([0-9]+)/.exec(text);
      // If we get one, that's the value for the quality we're looking for
      if (match) {
        return { ...acc, [factions[faction]]: Number(match[1]) };
      }
      // If we don't find a number, then the quality = 0 (the response
      // doesn't contain values for qualities at 0)
      return { ...acc, [factions[faction]]: 0 };
    }, {});
  }
}
