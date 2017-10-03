// Use these as the default expansion/visibility states if we don't
// have meaningful data
export const DEFAULT_PREFERENCES = {
  expansions: {
    tier1: false,
    tier2: false,
    tier3: false,
    tier4: false,
    faction: false,
    fidgetingWriter: false,
  },
  visibilities: {
    tier1: true,
    tier2: true,
    tier3: true,
    tier4: true,
    faction: true,
    fidgetingWriter: false,
  },
};

export const PREFERENCES_CHANGED = 'PREFERENCES_CHANGED';
