import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import Extension from '../Extension';

export default function insertExtension({ store }) {
  // Create a container element and insert it into the DOM
  const container = createAndInsertContainerElement();

  // Render our extension UI inside the container element
  ReactDOM.render(
    <Provider store={store}>
      <Extension />
    </Provider>,
    container,
  );
}

function createAndInsertContainerElement() {
  // Get the parent element for our outer container
  const parent = document.querySelector('div.you_bottom_rhs');

  // Find the element before which we should insert our container
  // element: in this case it's the first <h3> element
  // (FL categories aren't in containers of their own)
  const referenceNode = parent.querySelector('h3:first-of-type');

  // Insert and return the element
  return parent.insertBefore(document.createElement('div'), referenceNode);
}
