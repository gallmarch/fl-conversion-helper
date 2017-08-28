// These items have special conversion amounts
const ABOMINABLE_SALT = '476';
const AEOLIAN_SCREAM = '773';
const AMANITA_SHERRY = '928';
const AN_IDENTITY_UNCOVERED = '657';
const ANTIQUE_CONSTABLES_BADGE = '748';
const APPALLING_SECRET = '390';
const BROKEN_GIANT_1844 = '823';
const BRIGHT_BRASS_SKULL = '749';
const BRILLIANT_SOUL = '668';
const COLLATED_RESEARCH = '745';
const CORRESPONDENCE_PLAQUE = '932';
const COMPROMISING_DOCUMENT = '830';
const COPPER_CIPHER_RING = '758';
const CRYPTIC_CLUE = '389';
const DIARY_OF_THE_DEAD = '762';
const ENDOWMENT_OF_A_UNIVERSITY_FELLOWSHIP = '759';
const ENGRAVED_PEWTER_TANKARD = '757';
const ENTRY_IN_SLOWCAKES_EXCEPTIONALS = '752';
const EXTRAORDINARY_IMPLICATION = '809';
const FOXFIRE_CANDLE = '374';
const GREYFIELDS_1882 = '383';
const INCENDIARY_GOSSIP = '659';
const INKLING_OF_IDENTITY = '656';
const INTRIGUING_SNIPPET = '588';
const JADE_FRAGMENT = '377';
const JOURNAL_OF_INFAMY = '525';
const LAMPLIGHTER_BEESWAX = '384';
const MANIACS_PRAYER = '935';
const MAP_SCRAP = '920';
const MEMORY_OF_DISTANT_SHORES = '825';
const MEMORY_OF_LIGHT = '589';
const MORELWAYS_1872 = '815';
const MOURNING_CANDLE = '951';
const MUSCARIA_BRANDY = '927';
const MYSTERY_OF_THE_ELDER_CONTINENT = '587';
const NODULE_OF_PULSATING_AMBER = '754';
const O_BOYLES_PRACTICAL_PRIMER = '756';
const OLD_BONE_SKELETON_KEY = '753';
const ORNATE_TYPEWRITER = '755';
const PARTIAL_MAP = '956';
const PHOSPHORESCENT_SCARAB = '652';
const PRESBYTERATE_PASSPHRASE = '852';
const PRIMORDIAL_SHRIEK = '388';
const PRISONERS_HONEY = '391';
const PROSCRIBED_MATERIAL = '420';
const RED_FEATHERED_PIN = '761';
const RELIC_OF_THE_THIRD_CITY = '424';
const ROMANTIC_NOTION = '531';
const ROOKERY_PASSWORD = '751';
const SHARD_OF_GLIM = '378';
const SILK_SCRAP = '381';
const SOUL = '386';
const STOLEN_CORRESPONDENCE = '422';
const STOLEN_KISS = '944';
const STRANGLING_WILLOW_ABSINTHE = '822';
const TALE_OF_TERROR = '828';
const THIRSTY_BOMBAZINE_SCRAP = '922';
const TINY_JEWELLED_RELIQUARY = '750';
const TOUCHING_LOVE_STORY = '945';
const SURFACE_SILK_SCRAP = '907';
const VISION_OF_THE_SURFACE = '827';
const WHISPER_SATIN_SCRAP = '915';
const WHISPERED_HINT = '380';
const ZEE_ZTORY = '831';

const tier1 = [
  FOXFIRE_CANDLE,
  SOUL,
  WHISPERED_HINT,
  CRYPTIC_CLUE,
  STOLEN_CORRESPONDENCE,
  LAMPLIGHTER_BEESWAX,
  SHARD_OF_GLIM,
  GREYFIELDS_1882,
  SILK_SCRAP,
  PRIMORDIAL_SHRIEK,
  PRISONERS_HONEY,
  JADE_FRAGMENT,
  PROSCRIBED_MATERIAL,
];

const tier2 = [
  ABOMINABLE_SALT,
  AMANITA_SHERRY,
  APPALLING_SECRET,
  INTRIGUING_SNIPPET,
  PHOSPHORESCENT_SCARAB,
  MAP_SCRAP,
  MORELWAYS_1872,
  SURFACE_SILK_SCRAP,
  MANIACS_PRAYER,
  ROMANTIC_NOTION,
  RELIC_OF_THE_THIRD_CITY,
  INKLING_OF_IDENTITY,
];

const tier3 = [
  MEMORY_OF_DISTANT_SHORES,
  BRILLIANT_SOUL,
  TALE_OF_TERROR,
  COMPROMISING_DOCUMENT,
  MEMORY_OF_LIGHT,
  ZEE_ZTORY,
  STRANGLING_WILLOW_ABSINTHE,
  WHISPER_SATIN_SCRAP,
  JOURNAL_OF_INFAMY,
  CORRESPONDENCE_PLAQUE,
  VISION_OF_THE_SURFACE,
  MYSTERY_OF_THE_ELDER_CONTINENT,
  INCENDIARY_GOSSIP,
];

const tier4 = [
  COLLATED_RESEARCH,
  MUSCARIA_BRANDY,
  EXTRAORDINARY_IMPLICATION,
  STOLEN_KISS,
  MOURNING_CANDLE,
  PARTIAL_MAP,
  BROKEN_GIANT_1844,
  THIRSTY_BOMBAZINE_SCRAP,
  AEOLIAN_SCREAM,
  TOUCHING_LOVE_STORY,
  PRESBYTERATE_PASSPHRASE,
  AN_IDENTITY_UNCOVERED,
];

// Faction items
const factionItems = [
  OLD_BONE_SKELETON_KEY, // Criminals
  ENGRAVED_PEWTER_TANKARD, // Docks
  DIARY_OF_THE_DEAD, // Tomb-Colonies
  NODULE_OF_PULSATING_AMBER, // Rubberies
  ROOKERY_PASSWORD, // Urchins
  BRIGHT_BRASS_SKULL, // Hell
  ANTIQUE_CONSTABLES_BADGE, // Constables
  COPPER_CIPHER_RING, // Great Game
  TINY_JEWELLED_RELIQUARY, // Church
  ORNATE_TYPEWRITER, // Bohemians
  RED_FEATHERED_PIN, // Revolutionaries
  ENTRY_IN_SLOWCAKES_EXCEPTIONALS, // Society
  ENDOWMENT_OF_A_UNIVERSITY_FELLOWSHIP, // University
  O_BOYLES_PRACTICAL_PRIMER, // Widow
];

/* Look up the amount of an item necessary to mass-convert it */
function conversionCost(id) {

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
      LAMPLIGHTER_BEESWAX,
      SHARD_OF_GLIM,
      SILK_SCRAP,
    ].includes(id)) {
      return 1000;
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

export {
  conversionCost,
  factionItems,
  tier1,
  tier2,
  tier3,
  tier4,
};
