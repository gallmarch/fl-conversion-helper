import insertExtension, {
  createContainer,
  getParentSelector,
  getReferenceNodeSelector,
  insertContainer,
} from './insertExtension';

const LEGACY_PARENT_SELECTOR = 'div.you_bottom_rhs';
const LEGACY_REFERENCE_NODE_SELECTOR = 'h3:first-of-type';

describe('createContainer', () => {
  describe('in legacy mode', () => {
    it('creates a div element', () => {
      expect(createContainer(true)).toEqual(document.createElement('div'));
    });
  });

  describe('in non-legacy mode', () => {
    it('throws an error', () => {
      expect(() => createContainer(false)).toThrow();
    });
  });
});

describe('getParentSelector', () => {
  describe('in legacy mode', () => {
    it('returns the expected string', () => {
      expect(getParentSelector(true)).toEqual(LEGACY_PARENT_SELECTOR);
    });
  });

  describe('in non-legacy mode', () => {
    it('throws an error', () => {
      expect(() => getParentSelector(false)).toThrow();
    });
  });
});

describe('getReferenceNodeSelector', () => {
  describe('in legacy mode', () => {
    it('returns the expected string', () => {
      expect(getReferenceNodeSelector(true)).toEqual(LEGACY_REFERENCE_NODE_SELECTOR);
    });
  });

  describe('in non-legacy mode', () => {
    it('throws an error', () => {
      expect(() => getReferenceNodeSelector(false)).toThrow();
    });
  });
});

describe('insertContainer', () => {
  describe('in non-legacy mode', () => {
    it('throws an error', () => {
      expect(() => insertContainer(false)).toThrow();
    });
  });
});
