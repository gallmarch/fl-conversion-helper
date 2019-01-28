import MutationSummary from 'mutation-summary';

import insertCategories from './insertCategories';
import insertMenuItems from '../menu-items/insertMenuItems';

export const FLCH_CONTENT_CONTAINER_CLASS_NAME = 'flch-content-container';
export const POSSESSIONS_TAB_CANARY_CLASS_NAME = 'possessions__lodgings-and-equipped';
export const FLCH_SIDEBAR_CONTAINER_CLASS_NAME = 'flch-sidebar-container';

export default function addPossessionsListener({ store }) {
  const rootNode = document.querySelector('body');
  const queries = [{ element: '*' }, { characterData: true }];

  return new MutationSummary({
    rootNode,
    queries,
    callback: () => onBodyChange({ store }),
  });
}

export function onBodyChange({ store }) {
  const possessionsDomHasLoaded = hasPossessionsDomLoaded(document);
  const sidebarContainerIsPresent = isSidebarContainerPresent(document);
  const extensionContainerIsPresent = isContentContainerPresent(document);
  // If we're on the possessions page, and we haven't already inserted the
  // extension container, then insert menu items
  if (possessionsDomHasLoaded && !sidebarContainerIsPresent) {
    insertMenuItems({ store });
    if (!extensionContainerIsPresent) {
      insertCategories({ store });
    }
  }
}

export function hasPossessionsDomLoaded(document) {
  return document.querySelector(`.${POSSESSIONS_TAB_CANARY_CLASS_NAME}`);
}

export function isSidebarContainerPresent(document) {
  return document.querySelector(`.${FLCH_SIDEBAR_CONTAINER_CLASS_NAME}`);
}

export function isContentContainerPresent(document) {
  return document.querySelector(`.${FLCH_CONTENT_CONTAINER_CLASS_NAME}`);
}
