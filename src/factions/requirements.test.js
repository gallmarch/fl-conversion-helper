import { BOHEMIANS } from './index';
import { ORNATE_TYPEWRITER } from '../items/constants';
import factionAttributes from './attributes';

import {
  attributeRequired,
  createFailureMessage,
  favoursRequired,
  // meetsAttributeRequirement,
} from './requirements';

describe('factions/requirements', () => {
  describe('#attributeRequired', () => {
    it('returns negative infinity for Renown 0--14', () => {
      for (let i = 0; i < 15; i++) {
        expect(attributeRequired('BOHEMIANS', i).level).toBe(Number.NEGATIVE_INFINITY);
      }
    });

    it('returns Renown * 6 for Renown > 15', () => {
      for (let i = 15; i < 100; i++) {
        expect(attributeRequired('BOHEMIANS', i).level).toBe(i * 6);
      }
    });
  });

  describe('#createFailureMessage', () => {
    const id = ORNATE_TYPEWRITER;
    let attributes;
    let favours;
    let renown;

    beforeEach(() => {
      attributes = {};
      favours = { Bohemians: 0 };
      renown = { Bohemians: 0 };
    });

    it('mentions not enough Favours', () => {
      attributes[factionAttributes[BOHEMIANS]] = 1000;
      const message = createFailureMessage({ attributes, favours, id, renown });
      expect(message).toBe('You need 3 Favours (you have 0).');
    });

    it('mentions an attribute that is too low', () => {
      attributes[factionAttributes[BOHEMIANS]] = 10;
      favours.Bohemians = 7;
      renown.Bohemians = 40;
      const message = createFailureMessage({ attributes, favours, id, renown });
      expect(message).toBe(`You need Persuasive ${40 * 6} (you have 10).`);
    });

    it('mentions both', () => {
      attributes[factionAttributes[BOHEMIANS]] = 10;
      renown.Bohemians = 40;
      const message = createFailureMessage({ attributes, favours, id, renown });
      expect(message).toBe(`You need 7 Favours (you have 0) and Persuasive ${40 * 6} (you have 10).`);
    });
  });

  describe('#favoursRequired', () => {
    it('returns 3 for Renown 0--7', () => {
      for (let i = 0; i < 8; i++) {
        expect(favoursRequired(i)).toBe(3);
      }
    });

    it('returns 5 for Renown 8--14', () => {
      for (let i = 8; i < 15; i++) {
        expect(favoursRequired(i)).toBe(5);
      }
    });

    // Renown 50 is a soft cap, but why keep going?
    it('returns 7 for Renown 15--50', () => {
      for (let i = 15; i < 100; i++) {
        expect(favoursRequired(i)).toBe(7);
      }
    });
  });
});
