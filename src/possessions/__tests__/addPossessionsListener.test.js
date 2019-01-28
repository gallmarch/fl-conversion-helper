import {
  FLCH_CONTENT_CONTAINER_CLASS_NAME,
  FLCH_SIDEBAR_CONTAINER_CLASS_NAME,
  POSSESSIONS_TAB_CANARY_CLASS_NAME,
  isContentContainerPresent,
  hasPossessionsDomLoaded,
  isSidebarContainerPresent,
} from '../addPossessionsListener';

describe('isContentContainerPresent', () => {
  it('returns true if the expected DOM element is present', () => {
    document.body.innerHTML = `
      <div>
        <div class="${FLCH_CONTENT_CONTAINER_CLASS_NAME}"></div>
      </div>
    `;
    expect(isContentContainerPresent(document)).toBeTruthy();
  });

  it('return false otherwise', () => {
    document.body.innerHTML = '<div></div>';
    expect(isContentContainerPresent(document)).toBeFalsy();
  });
});

describe('hasPossessionsDomLoaded', () => {
  it('returns true if it finds the canary element', () => {
    document.body.innerHTML = `<div><div class="${POSSESSIONS_TAB_CANARY_CLASS_NAME}"></div></div>`;
    expect(hasPossessionsDomLoaded(document)).toBeTruthy();
  });
  it('returns false otherwise', () => {
    document.body.innerHTML = '<div></div>';
    expect(hasPossessionsDomLoaded(document)).toBeFalsy();
  });
});

describe('isSidebarContainerPresent', () => {
  it('returns true if the FLCH sidebar container element is present', () => {
    document.body.innerHTML = `<div><div class="${FLCH_SIDEBAR_CONTAINER_CLASS_NAME}"></div></div>`;
    expect(isSidebarContainerPresent(document)).toBeTruthy();
  });
  it('returns false otherwise', () => {
    document.body.innerHTML = '<div></div>';
    expect(isSidebarContainerPresent(document)).toBeFalsy();
  });
});
