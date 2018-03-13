import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Nav from '../Nav';
import { log } from '../util';

export default function insertNav({ store }) {
  const parent = document.querySelector('#main .nav > div > nav > ol');
  const referenceNode = parent.firstElementChild;
  const container = parent.insertBefore(document.createElement('div'), referenceNode);
  container.id = 'flch-nav-root';

  log('Inserting <Nav />');

  ReactDOM.render(
    <Provider store={store}>
      <Nav />
    </Provider>,
    container,
  );
}
