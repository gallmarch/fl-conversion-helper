import favoursRequired from '../favoursRequired';

describe('favoursRequired', () => {
  it('returns 3 if renown is less than 8', () => {
    for (let renown = 0; renown < 8; renown++) {
      expect(favoursRequired(renown)).toBe(3);
    }
  });
  it('returns 5 if renown is in [8, 14]', () => {
    for (let renown = 8; renown < 15; renown++) {
      expect(favoursRequired(renown)).toBe(5);
    }
  });
  it('returns 7 if renown is 15 or higher', () => {
    for (let renown = 15; renown < 100; renown++) {
      expect(favoursRequired(renown)).toBe(7);
    }
  });
});
