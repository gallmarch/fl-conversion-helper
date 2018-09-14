import createCachedSelector from 're-reselect';

import { TIERS } from '../preferences/constants';
import conversionCost from './conversionCost';

const { ALWAYS, SMALL } = TIERS;

const getAlwaysConvertible = (state, { alwaysConvertible }) => alwaysConvertible;
const getEnablementPreference = (state, { enablementPreference }) => enablementPreference;
const getId = (state, { id }) => id;
const getQuantity = (state, { data: { quantity } }) => quantity;

const cacheKey = getId;

const inputFuncs = [
  getAlwaysConvertible,
  getEnablementPreference,
  getId,
  getQuantity,
];

const outputFunc = (
  alwaysConvertible,
  pref,
  id,
  quantity,
) => alwaysConvertible || pref === ALWAYS || quantity >= conversionCost(id, pref === SMALL);

export default createCachedSelector(inputFuncs, outputFunc)(cacheKey);
