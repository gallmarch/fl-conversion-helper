import attributeLevelRequired from '../attributeLevelRequired';

describe('attributeLevelRequired', () => {
  it('returns negative infinity if Renown is below 15', () => {
    for (let i = 0; i < 15; i++) {
      expect(attributeLevelRequired(i)).toBe(Number.NEGATIVE_INFINITY);
    }
  });
  it('returns Renown * 6 if Renown is 15 or greater', () => {
    for (let renown = 15; renown < 100; renown++) {
      expect(attributeLevelRequired(renown)).toBe(renown * 6);
    }
  });
});
