import { attributeName } from '../attributes/names';
import factionAttributes from './attributes';
import { items } from './index';

export {
  attributeRequired,
  createFailureMessage,
  favoursRequired,
  meetsAttributeRequirement,
};

// Given a faction and a Renown value, return the attribute and the level
// required to do conversion
function attributeRequired(faction, renown) {
  // Get the attribute whose value determines whether we can perform
  // a Favours-to-Renown conversion
  const attribute = factionAttributes[faction];
  // If your Renown is less than 15, there's no attribute requirement
  // for conversion (even if you're equipping a Talkative Rattus Faber,
  // so you can convert Favours to Renown even with an attribute below 0)
  if (renown < 15) {
    return { attribute, level: Number.NEGATIVE_INFINITY };
  }

  // Otherwise, you need [your current Renown] * 6 in the faction-relevant
  // attribute in order to convert
  const level = renown * 6;
  return { attribute, level };
}

// Create a failure message for a FactionItem.
function createFailureMessage({ attributes, favours, id, renown }) {
  // We need a temporary list to store reasons why we can't convert
  const failureReasons = [];

  // Get the faction for this item
  const faction = items[id];
  const factionFavours = favours[faction];
  // Have we got enough Favours?
  const hasEnoughFavours = factionFavours >= favoursRequired(renown[faction]);
  // Have we got a sufficiently high attribute for our Renown with this faction?
  const hasAttributeLevel = meetsAttributeRequirement({ attributes, faction, renown });

  // Add a not-enough-Favours explanation
  if (!hasEnoughFavours) {
    const favoursNeeded = favoursRequired(renown[faction]);
    const actualFavours = factionFavours === undefined ? 0 : factionFavours;
    const insufficientFavoursMessage = `${favoursNeeded} Favours (you have ${actualFavours})`;
    failureReasons.push(insufficientFavoursMessage);
  }

  // Add an attribute-too-low explanation
  if (!hasAttributeLevel) {
    // Get the attribute and required level for upconverting this faction at this Renown
    const {
      attribute: relevantAttribute,
      level: necessaryLevel,
    } = attributeRequired(faction, renown[faction]);
    // Get the current attribute
    const actualAttributeLevel = attributes[relevantAttribute];
    // Build the string
    const insufficientAttributeMessage = `${attributeName(relevantAttribute)} ${necessaryLevel} (you have ${actualAttributeLevel})`;
    failureReasons.push(insufficientAttributeMessage);
  }

  // Return a nicely-formatted message
  const message = `You need ${failureReasons.join(' and ')}.`;
  return message;
}

// Given a Renown value, return the number of Favours necessary to
// convert them to Renown
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

function meetsAttributeRequirement({ attributes, faction, renown }) {
  const { attribute, level } = attributeRequired(faction, renown[faction]);
  return attributes[attribute] >= level;
}
