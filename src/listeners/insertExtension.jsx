import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import Extension from '../Extension';
import { UnsupportedError } from '../errors';
import { log } from '../util';

export {
  createContainer,
  getParentSelector,
  getReferenceNodeSelector,
  insertContainer,
};

export default function insertExtension({ store, isLegacy  }) {
  log(`calling insertExtension() with isLegacy=${isLegacy}`);
  // Create a container element for the extension
  const container = createContainer(isLegacy);

  // Add the container to the DOM
  insertContainer(container, isLegacy);

  // Render our extension UI inside the container element
  ReactDOM.render(
    <Provider store={store}>
      <Extension isLegacy={isLegacy} />
    </Provider>,
    container,
  );
}

function createContainer(isLegacy) {
  return document.createElement('div');
}

function insertContainer(container) {
  // Get the parent element for our outer container
  const parentSelector = getParentSelector();
  log(`Using parentSelector: ${parentSelector}`);
  const parent = document.querySelector(parentSelector);

  // Find the element before which we should insert our container
  // element: in this case it's the first <h3> element
  // (FL categories aren't in containers of their own)
  const referenceNode = parent.querySelector(getReferenceNodeSelector());

  // Insert and return the element
  return parent.insertBefore(container, referenceNode);
}

function getParentSelector() {
  return 'div.stack-content';
}

function getReferenceNodeSelector() {
  return 'div:first-of-type';
}
