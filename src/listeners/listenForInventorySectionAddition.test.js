import listenForInventorySectionAddition, { callback } from './listenForInventorySectionAddition';

describe('listenForInventorySection', () => {
  const store = {};

  it('throws an error if isLegacy is false', () => {
    const isLegacy = false;
    expect(() => listenForInventorySectionAddition({ store, isLegacy })).toThrow();
  });

  it('returns a MutationSummary if isLegacy is true', () => {
    const isLegacy = true;
    expect(typeof listenForInventorySectionAddition({
      store,
      isLegacy,
    })).toBe('object');
  });
});

describe('callback', () => {
  it('returns a function', () => {
    expect(typeof callback({})).toBe('function');
  });
});
