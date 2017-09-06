import { WATCHFUL, SHADOWY, PERSUASIVE, DANGEROUS } from './index';

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
