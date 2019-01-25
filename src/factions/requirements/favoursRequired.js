
/**
 * Given a Renown value, return the number of Favours necessary to
 * convert them to Renown.
 * @param renown
 */
export default function favoursRequired(renown) {
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
