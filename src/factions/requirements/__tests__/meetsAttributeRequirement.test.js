import meetsAttributeRequirement from '../meetsAttributeRequirement';

describe('meetsAttributeRequirement', () => {
  it('returns true if we have a sufficiently high level to do the Favours -> Renown conversion', () => {
    const faction = 'Bohemians';
    const attributes = { Persuasive: 90 };
    const renown = { Bohemians: 15 };
    expect(meetsAttributeRequirement({ faction, attributes, renown })).toBe(true);
  });
  it('returns false if we don\'t have a high enough level', () => {
    const faction = 'Bohemians';
    const attributes = { Persuasive: 90 };
    const renown = { Bohemians: 16 };
    expect(meetsAttributeRequirement({ faction, attributes, renown })).toBe(false);
  });
});
