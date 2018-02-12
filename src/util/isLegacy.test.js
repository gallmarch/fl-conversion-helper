import isLegacy from './isLegacy';

describe('utils/isLegacy', () => {
  beforeEach(() => {
    [...document.head.querySelectorAll('script')]
      .filter(x => x.getAttribute('src') && x.getAttribute('src').indexOf('ui26.js') >= 0)
      .forEach(el => document.head.removeChild(el));
  });

  it('returns true if if detects a `src="ui26.js"` attribute', () => {
    const scriptEl = document.createElement('script');
    scriptEl.src = '/some/path/to/ui26.js';
    document.head.appendChild(scriptEl);
    expect(isLegacy()).toBe(true);
  });

  it('returns false if it detects no such attribute', () => {
    expect(isLegacy()).toBe(false);
  });
});
