/* eslint-disable import/prefer-default-export */
import { WATCHFUL, SHADOWY, PERSUASIVE, DANGEROUS } from './index';

// Get the human-readable name for an attribute with the given ID
function attributeName(attr) {
  switch (attr) {
    case WATCHFUL:
      return 'Watchful';
    case SHADOWY:
      return 'Shadowy';
    case PERSUASIVE:
      return 'Persuasive';
    case DANGEROUS:
      return 'Dangerous';
    default:
      return undefined;
  }
}

export {
  attributeName,
};
