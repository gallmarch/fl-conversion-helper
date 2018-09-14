import createCachedSelector from 're-reselect';
import { attributeLevelRequired, favoursRequired } from '../factions/requirements';

import factionAttributes from '../factions/attributes';
import getFaction from '../factions/getFaction';

const getAttributes = ({ attributes }) => attributes;
const getId = (state, { id }) => id;
const getMyself = ({ myself }) => myself;

const cacheKey = getId;

const inputFuncs = [
  getAttributes,
  getId,
  getMyself,
];

const outputFunc = (attributes, id, myself) => {
  // Get this faction's attribute, Renown level, and Favours
  const { favours, renown } = myself;
  const factionKey = getFaction(id);
  const factionAttribute = factionAttributes[factionKey];
  const factionFavours = favours[factionKey];
  const factionRenown = renown[factionKey];

  // Check whether we meet the Favour and attribute requirements to convert at
  // this Renown level
  const hasEnoughFavours = factionFavours >= favoursRequired(factionRenown);
  const hasAttributeLevel = attributes[factionAttribute] >= attributeLevelRequired(factionRenown);

  // If we meet the requirements, then return null
  if (hasEnoughFavours && hasAttributeLevel) {
    return null;
  }

  // Otherwise, build a string to explain why the item is disabled
  const failureReasons = [];
  if (!hasEnoughFavours) {
    failureReasons.push(`${favoursRequired(factionRenown)} Favours (you have ${factionFavours})`);
  }
  if (!hasAttributeLevel) {
    failureReasons.push(`${factionAttribute} ${attributeLevelRequired(factionRenown)} (you have ${attributes[factionAttribute]})`);
  }
  return `You need ${failureReasons.join(' and ')}.`;
};

export default createCachedSelector(inputFuncs, outputFunc)(cacheKey);
