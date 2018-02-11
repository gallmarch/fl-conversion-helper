import { favoursRequired, attributeRequired } from './requirements';

import * as factions from './index';

describe('factions/requirements', () => {
  describe('#attributeRequired', () => {
    it('returns negative infinity for Renown 0--14', () => {
      for (let i = 0; i < 15; i++) {
        expect(attributeRequired('Bohemians', i).level).toBe(Number.NEGATIVE_INFINITY);
      }
    });

    it('returns Renown * 6 for Renown > 15', () => {
      for (let i = 15; i < 100; i++) {
        expect(attributeRequired('Bohemians', i).level).toBe(i * 6);
      }
    });
  });

  describe('#favoursRequired', () => {
    it('return 3 for Renown 0--7', () => {
      for (let i = 0; i < 8; i++) {
        expect(favoursRequired(i)).toBe(3);
      }
    });

    it('return 5 for Renown 8--14', () => {
      for (let i = 8; i < 15; i++) {
        expect(favoursRequired(i)).toBe(5);
      }
    });

    // Renown 50 is a soft cap, but why keep going?
    it('return 7 for Renown 15--50', () => {
      for (let i = 15; i < 100; i++) {
        expect(favoursRequired(i)).toBe(7);
      }
    });
  });
});
