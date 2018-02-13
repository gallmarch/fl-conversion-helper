import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import Extension from '../Extension';
import { UnsupportedError } from '../errors';

export {
  createContainer,
  getParentSelector,
  getReferenceNodeSelector,
  insertContainer,
};

export default function insertExtension({ store, isLegacy = true }) {
  // Create a container element for the extension
  const container = createContainer(isLegacy);

  // Add the container to the DOM
  insertContainer(container, isLegacy);

  // Render our extension UI inside the container element
  ReactDOM.render(
    <Provider store={store}>
      <Extension />
    </Provider>,
    container,
  );
}

function createContainer(isLegacy) {
  if (isLegacy) {
    return document.createElement('div');
  }

  throw new UnsupportedError();
}

function insertContainer(container, isLegacy = true) {
  if (isLegacy) {

    // Get the parent element for our outer container
    const parent = document.querySelector(getParentSelector({ isLegacy }));

    // Find the element before which we should insert our container
    // element: in this case it's the first <h3> element
    // (FL categories aren't in containers of their own)
    const referenceNode = parent.querySelector(getReferenceNodeSelector(isLegacy));

    // Insert and return the element
    return parent.insertBefore(container, referenceNode);
  }

  throw new UnsupportedError();
}

function getParentSelector(isLegacy) {
  if (isLegacy) {
    return 'div.you_bottom_rhs';
  }

  throw new UnsupportedError();
}

function getReferenceNodeSelector(isLegacy) {
  if (isLegacy) {
    return 'h3:first-of-type';
  }

  throw new UnsupportedError();
}
