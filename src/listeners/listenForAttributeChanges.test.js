import { callback, getAttributeValueFromDOM, getRootNodeSelector } from './listenForAttributeChanges';


describe('getAttributeValueFromDOM', () => {
  const attributeID = 209; // Watchful
  let mockDocument;

  beforeEach(() => {
  });

  it('returns a value if isLegacy is true', () => {
    // Create a local DOM tree --- this is based on the structure of the legacy UI
    mockDocument = document.createElement('a');
    const div = document.createElement('div');
    div.setAttribute('id', `infoBarQImage${attributeID}`);
    mockDocument.appendChild(div);

    const span = document.createElement('span');
    const strong = document.createElement('strong');
    strong.innerText = 'Watchful 234 - Extraordinary';
    span.appendChild(strong);
    mockDocument.appendChild(span);

    expect(getAttributeValueFromDOM({ attributeID, document: mockDocument })).toBe(234);
  });

  it('throws if isLegacy is false', () => {
    expect(() => getAttributeValueFromDOM({
      attributeID,
      document: mockDocument,
      isLegacy: false,
    })).toThrow();
  });
});

describe('getRootNodeSelector', () => {
  it('returns a string if isLegacy is true', () => {
    expect(typeof getRootNodeSelector({ isLegacy: true })).toBe('string');
  });

  it('throws an error if isLegacy is false', () => {
    expect(() => getRootNodeSelector({ isLegacy: false })).toThrow();
  })
});
