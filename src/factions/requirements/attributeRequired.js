import factionAttributes from '../attributes';
import attributeLevelRequired from './attributeLevelRequired';

/**
 * Given a faction and a Renown value, return the attribute and the level
 * required to do conversion
 * @param faction
 * @param renown
 * @returns {{level: number, attribute: *}}
 */
export default function attributeRequired(faction, renown) {
  // Get the attribute whose value determines whether we can perform
  // a Favours-to-Renown conversion
  const attribute = factionAttributes[faction];
  const level = attributeLevelRequired(renown);
  return { attribute, level };
}
