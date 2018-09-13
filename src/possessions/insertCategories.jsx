import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Categories from '../categories/Categories';


export default function insertCategories({ store }) {
  const parent = document.querySelector('.stack-content');
  if (!parent) {
    return;
  }
  const container = document.createElement('div');
  container.classList.add('flch-content-container');
  parent.insertBefore(container, parent.querySelector('div'));
  ReactDOM.render(
    <Provider store={store}>
      <Categories />
    </Provider>,
    container,
  );
}
