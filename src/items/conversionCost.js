import {
  APPALLING_SECRET,
  COLLATED_RESEARCH,
  FOXFIRE_CANDLE,
  INTRIGUING_SNIPPET,
  JADE_FRAGMENT,
  LAMPLIGHTER_BEESWAX,
  PROSCRIBED_MATERIAL,
  SHARD_OF_GLIM,
  SILK_SCRAP,
  STOLEN_CORRESPONDENCE,
  WHISPERED_HINT,
  factionItems,
  tier1,
  tier2,
  tier3,
  tier4,
} from './constants';

export default function conversionCost(id, enableSmallConversions = false) {
  if (enableSmallConversions) {
    return smallConversionCost(id);
  }
  return largeConversionCost(id);
}

export { conversionCost, largeConversionCost, smallConversionCost };

function smallConversionCost(id) {
  // Tier 4 items have no small/large conversion differences
  if (tier4.includes(id)) {
    return largeConversionCost(id);
  }

  // Nor do Tier 3
  if (tier3.includes(id)) {
    return largeConversionCost(id);
  }

  // Tier 2 items are mostly 50:5, with a couple of exceptions
  if (tier2.includes(id)) {
    // Intriguing Snippets require 25 to upconvert
    if (INTRIGUING_SNIPPET === id) {
      return 25;
    }
    // Appalling Secrets require 33 to upconvert
    if (APPALLING_SECRET === id) {
      return 33;
    }
    return 50;
  }

  // Tier 1 items are mostly either 100 or 50
  if (tier1.includes(id)) {
    // Whispered Hints always require 500 (no small-quantity conversions)
    if (WHISPERED_HINT === id) {
      return 500;
    }
    // Proscribed Material requires 25
    if (PROSCRIBED_MATERIAL === id) {
      return 25;
    }
    // Stolen Correspondence requires 24
    if (STOLEN_CORRESPONDENCE === id) {
      return 24;
    }
    // Some Tier 1 items require 100 to convert
    if ([
      FOXFIRE_CANDLE,
      JADE_FRAGMENT,
      LAMPLIGHTER_BEESWAX,
      SHARD_OF_GLIM,
      SILK_SCRAP,
    ].includes(id)) {
      return 100;
    }
    // The others require 50
    return 50;
  }

  return undefined;
}

function largeConversionCost(id) {
  // Faction items can be used if we have at least one of them
  if (factionItems.includes(id)) {
    return 1;
  }

  if (tier4.includes(id)) {
    // Collated Research can't be converted
    if (id === COLLATED_RESEARCH) {
      return Number.POSITIVE_INFINITY;
    }
    return 25;
  }

  // Tier 3 items
  if (tier3.includes(id)) {
    // All Tier 3 items convert 50->51
    return 50;
  }

  // Tier 2 items
  if (tier2.includes(id)) {
    // Appalling Secrets up-convert @ 333
    if (id === APPALLING_SECRET) {
      return 333;
    }
    // IS up-convert @ 250
    if (INTRIGUING_SNIPPET === id) {
      return 250;
    }
    // All other Tier 2 items up-convert @ 500
    return 500;
  }

  // Tier 1 items
  if (tier1.includes(id)) {
    // A few Tier 1 items up-convert @ 1000
    if ([
      FOXFIRE_CANDLE,
      JADE_FRAGMENT,
      LAMPLIGHTER_BEESWAX,
      SHARD_OF_GLIM,
      SILK_SCRAP,
    ].includes(id)) {
      return 1000;
    }
    if (PROSCRIBED_MATERIAL === id) {
      return 250;
    }
    // SC up-converts @ 200
    if (id === STOLEN_CORRESPONDENCE) {
      return 200;
    }
    // The rest of the Tier 2 items up-convert @ 500
    return 500;
  }

  // GIGO
  return undefined;
}
