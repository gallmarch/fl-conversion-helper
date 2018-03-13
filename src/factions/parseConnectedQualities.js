import $ from 'jquery';

import { log } from '../util';
import * as factions from '../factions';
import factionNames from './factionNames';
import renownIDs from '../factions/renown';
import favourIDs from '../factions/favours';

// Given the HTML response from the server, do some DOM searching
// and return Renown and Favours in a format that we can use
export default function parseConnectedQualities(response) {
  // JQuery lets us find elements by children's IDs, which is a pain
  // otherwise.
  // const $el = $(response);

  // Get the Renown and Favours values for each faction
  // const renown = findMatches(renownIDs);
  // const favours = findMatches(favourIDs);

  log('Response being parsed:');
  console.info(response);

  const { Possessions: possessions } = response;

  const social = possessions.find(_ => _.Name && _.Name === "Social: Contacts & Acquaintances");
  if (!social) {
    log('Couldn\'t find contacts and acquaintances');
    return;
  }

  const { Possessions: qualities } = social;

  console.info('factionNames');
  console.info(factionNames);

  console.info(qualities);

  // const renown = findRenown(response);
  const favours = findMatches(qualities, 'Favours');
  const renown = findMatches(qualities, 'Renown');

  return { renown, favours };

  function findMatches(social, prefix) {
    return Object.keys(factionNames).reduce((acc, faction) => {
      const factionName = factionNames[faction];
      const match = social.find(_ => _.name === `${prefix}: ${factionName}`);
      if (match ) {
        return { ...acc, [faction]: match.Level };
      }
    }, {});
  }

  /*
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
  */
}
