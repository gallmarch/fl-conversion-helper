import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as items from '../items/constants';

import MenuItem from './MenuItem';
import scrollTo from './scrollTo';

// Taken from:
// https://github.com/flyingant/react-scroll-to-component/blob/1d11ffa525dec9ade68a3f4b52612ed4a17716af/index.js
function calculateScrollOffset(element, offset, alignment) {
  const body = document.body;
  const html = document.documentElement;
  const elementRect = element.getBoundingClientRect();
  const clientHeight = html.clientHeight;
  const documentHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );
  let scrollPosition;
  switch (alignment) {
    case 'top':
      scrollPosition = elementRect.top;
      break;
    case 'middle':
      scrollPosition = elementRect.bottom - (clientHeight / 2) - (elementRect.height / 2);
      break;
    case 'bottom':
      scrollPosition = elementRect.bottom - clientHeight;
      break;
    default:
      scrollPosition = elementRect.bottom - (clientHeight / 2) - (elementRect.height / 2);
      break; // default to middle
  }
  const maxScrollPosition = documentHeight - clientHeight;
  return Math.min(scrollPosition + (offset || 0) + window.pageYOffset, maxScrollPosition);
}

function handleClick(name) {
  const element = [...document.querySelectorAll('h3.heading--3')].find(_ => _.innerText.trim() === name);
  if (!element) {
    return;
  }
  const scrollOffset = calculateScrollOffset(element, 0, 'top');
  scrollTo({
    element: document.body,
    start: window.scrollY,
    to: scrollOffset,
    duration: 180, // wheeeeee
  });
}

function MenuItems(props) {
  const { preferences: { visibilities } } = props;
  return (
    <Fragment>
      {visibilities.tier1 && (
        <MenuItem
          items={items.tier1}
          name="Tier 1"
          onClick={() => handleClick('Tier 1')}
        />
      )}
      {visibilities.tier2 && (
        <MenuItem
          items={items.tier2}
          name="Tier 2"
          onClick={() => handleClick('Tier 2')}
        />
      )}
      {visibilities.tier3 && (
        <MenuItem
          items={items.tier3}
          name="Tier 3"
          onClick={() => handleClick('Tier 3')}
        />
      )}
      {visibilities.tier4 && (
        <MenuItem
          items={items.tier4}
          name="Tier 4"
          onClick={() => handleClick('Tier 4')}
        />
      )}
      {visibilities.faction && (
        <MenuItem
          items={items.factionItems}
          name="Faction Items"
          onClick={() => handleClick('Faction Items')}
        />
      )}
      {visibilities.fidgetingWriter && (
        <MenuItem
          items={items.fidgetingWriter}
          name="Fidgeting Writer"
          onClick={() => handleClick('Fidgeting Writer')}
        />
      )}
    </Fragment>
  );
}

MenuItems.propTypes = {
  preferences: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = ({ preferences }) => ({ preferences });

export default connect(mapStateToProps)(MenuItems);
