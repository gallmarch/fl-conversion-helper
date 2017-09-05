import * as factions from './index';
import attributes from './attributes';

function favoursRequired(renown) {
  // If your Renown is 7 or less, then you can convert 3 or more Favours
  if (renown < 8) {
    return 3;
  }

  // If your Renown is 8 -- 14, then you can convert 5 or more Favours
  if (renown < 15) {
    return 5;
  }

  // If your Renown is 15 or greater, then you need 7 Favours
  return 7;
}

function attributeRequired(faction, renown) {
  // If your Renown is less than 15, there's no attribute requirement
  // for conversion (even if you're equipping a Talkative Rattus Faber)
  if (renown < 15) {
    return Number.NEGATIVE_INFINITY;
  }

  // Otherwise, you need [your current Renown] * 6 in the faction-relevant
  // attribute in order to convert
  const level = renown * 6;
  const attribute = attributes[faction];
  return { attribute, level };
}

export { attributeRequired, favoursRequired };
