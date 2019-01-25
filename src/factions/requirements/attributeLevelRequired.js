export default function attributeLevelRequired(renown) {
  // If your Renown is less than 15, there's no attribute requirement
  // for conversion (even if you're equipping a Talkative Rattus Faber,
  // so you can convert Favours to Renown even with an attribute below 0)
  if (renown < 15) {
    return Number.NEGATIVE_INFINITY;
  }

  // Otherwise, you need [your current Renown] * 6 in the faction-relevant
  // attribute in order to convert
  return renown * 6;
}

