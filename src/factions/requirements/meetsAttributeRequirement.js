import attributeRequired from './attributeRequired';

/**
 *
 * @param attributes
 * @param faction
 * @param renown
 */
export default function meetsAttributeRequirement({ attributes, faction, renown }) {
  const { attribute, level } = attributeRequired(faction, renown[faction]);
  return attributes[attribute] >= level;
}
