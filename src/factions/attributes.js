import * as factions from './index';
import { WATCHFUL, SHADOWY, DANGEROUS, PERSUASIVE } from '../attributes';

// This maps each faction's ID to the attribute whose level determines
// we can raise Renown
export default {
  [factions.BOHEMIANS]: PERSUASIVE,
  [factions.CHURCH]: WATCHFUL,
  [factions.CONSTABLES]: DANGEROUS,
  [factions.CRIMINALS]: SHADOWY,
  [factions.DOCKS]: DANGEROUS,
  [factions.GREAT_GAME]: PERSUASIVE,
  [factions.HELL]: PERSUASIVE,
  [factions.REVOLUTIONARIES]: SHADOWY,
  [factions.RUBBERIES]: PERSUASIVE,
  [factions.TOMB_COLONIES]: DANGEROUS,
  [factions.URCHINS]: SHADOWY,
  [factions.SOCIETY]: DANGEROUS,
};
