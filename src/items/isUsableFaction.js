import createCachedSelector from 're-reselect';

import factionAttributes from '../factions/attributes';
import getFaction from '../factions/getFaction';
import { attributeLevelRequired, favoursRequired } from '../factions/requirements';
import { FACTIONS } from '../preferences/constants';

const getAttributes = ({ attributes }) => attributes;
const getId = (state, { id }) => id;
const getMyself = ({ myself }) => myself;
const getEnablements = ({ preferences: { enablements } }) => enablements;

const cacheKey = getId;

const inputFuncs = [
  getAttributes,
  getEnablements,
  getId,
  getMyself,
];

const outputFunc = (attributes, enablements, id, myself) => {
  if (enablements.factions === FACTIONS.ALWAYS) {
    return true;
  }

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

  return hasEnoughFavours && hasAttributeLevel;
};

export default createCachedSelector(inputFuncs, outputFunc)(cacheKey);
