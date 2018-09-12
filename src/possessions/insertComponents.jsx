import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Categories from '../categories/Categories';
import MenuItems from './MenuItems';

export function insertMenuItems({ preferences, store }) {
  console.info('inserting menu items');
  // NOTE: This selector currently finds the correct nav, but that
  // may change at any point
  const parent = document.querySelector('.possessions nav');
  if (!parent) {
    return;
  }
  const container = createContainer();
  parent.insertBefore(container, parent.firstChild);
  ReactDOM.render(
    <Provider store={store}>
      <MenuItems />
    </Provider>,
    container,
  );

  function createContainer() {
    const container = document.createElement('ol');
    container.classList.add('list-roman', 'flch-sidebar-container');
    return container;
  }
}

export function insertCategories({ preferences, store }) {

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
