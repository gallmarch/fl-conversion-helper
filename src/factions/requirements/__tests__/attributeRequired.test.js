import attributeRequired from '../attributeRequired';

describe('attributeRequired', () => {
  it('returns an object with the expected keys', () => {
    expect(attributeRequired('Bohemians', 15)).toEqual({
      attribute: 'Persuasive',
      level: 90,
    });
  });
});
