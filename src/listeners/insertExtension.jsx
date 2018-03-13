import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import Extension from '../Extension';
import { UnsupportedError } from '../errors';
import { log } from '../util';

export {
  createContainer,
  insertContainer,
};

export default function insertExtension({ store }) {
  log(`calling insertExtension()`);
  // Create a container element for the extension
  const container = createContainer();

  // Add the container to the DOM
  insertContainer(container);

  // Render our extension UI inside the container element
  ReactDOM.render(
    <Provider store={store}>
      <Extension />
    </Provider>,
    container,
  );
}

function createContainer() {
  return document.createElement('div');
}

function insertContainer(container) {
  // Get the parent element for our outer container
  const parentSelector = 'div.stack-content';
  const parent = document.querySelector(parentSelector);

  // Find the element before which we should insert our container
  // element: in this case it's the first <h3> element
  // (FL categories aren't in containers of their own)
  const referenceNode = parent.querySelector('div:first-of-type');

  // Insert and return the element
  return parent.insertBefore(container, referenceNode);
}
