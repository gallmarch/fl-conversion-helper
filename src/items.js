// These items have special conversion amounts
const APPALLING_SECRET = '390';
const FOXFIRE_CANDLE = '374';
const INTRIGUING_SNIPPET = '588';
const JADE_FRAGMENT = '377';
const LAMPLIGHTER_BEESWAX = '384';
const PROSCRIBED_MATERIAL = '420';
const SHARD_OF_GLIM = '378';
const SILK_SCRAP = '381';
const STOLEN_CORRESPONDENCE = '422';

const tier1 = [
  FOXFIRE_CANDLE,
  '386', // Souls
  '380', // Whispered Hints
  '389', // Cryptic Clues
  STOLEN_CORRESPONDENCE,
  LAMPLIGHTER_BEESWAX,
  SHARD_OF_GLIM,
  '383', // Greyfields 1882
  SILK_SCRAP,
  '388', // Primordial Shrieks
  '391', // Prisoner's Honey
  JADE_FRAGMENT,
  PROSCRIBED_MATERIAL,
];

const tier2 = [
  '476', // Abominable Salts
  '928', // Amanita Sherry
  APPALLING_SECRET,
  INTRIGUING_SNIPPET,
  '652', // Phosphorescent Scarabs
  '920', // Map Scraps
  '815', // Morelways 1872
  '907', // Surface-Silk Scrap
  '935', // Maniac's Prayers
  '531', // Romantic Notions
  '424', // Relics of the Third City
  '656', // Inklings of Identity
];

const tier3 = (() => {
  // These are the item IDs of the tier-3 items in each category
  // (Mysteries, being weird, has two)
  const academic = '825'; 
  const cartography = '831'; 
  const elder = '587'; 
  const infernal = '668'; 
  const influence = '830';
  const luminosity = '589';
  const mysteriesJOI = '525';
  const mysteriesTOT = '828';
  const nostalgia = '827';
  const ragTrade = '915';
  const rumour = '659';
  const wildWords = '932';
  const wines = '822';
  return [
    academic,
    infernal,
    mysteriesTOT,
    influence,
    luminosity,
    cartography,
    wines,
    ragTrade,
    mysteriesJOI,
    wildWords,
    nostalgia,
    elder,
    rumour,
  ];
})();

/* Look up the amount of an item necessary to mass-convert it */
function conversionCost(id) {
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
    // IS and PM up-convert @ 250
    if ([
      INTRIGUING_SNIPPET,
      PROSCRIBED_MATERIAL,
    ].includes(id)) {
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
      SHARD_OF_GLIM,
      SILK_SCRAP,
    ].includes(id)) {
      return 1000;
    }
    // SC up-converts @ 200
    if (id === STOLEN_CORRESPONDENCE) {
      return 200;
    }
    return 500;
  }

  // GIGO
  return undefined;
}

// Export the IDs in order of the side-conversion chain, starting
// with the 'Academic' category
export {
  conversionCost,
  tier1,
  tier2,
  tier3,
};
