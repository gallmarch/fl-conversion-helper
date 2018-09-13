import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      {visibilities.tier1 && (<li className="nav__item nav__item--flch">
        <a
          role="button"
          onClick={() => handleClick('Tier 1')}
          tabIndex="-1"
        >
          Tier 1
        </a>
      </li>)}
      {visibilities.tier2 && (<li className="nav__item nav__item--flch">
        <a
          role="button"
          tabIndex="-1"
          onClick={() => handleClick('Tier 2')}
        >
          Tier 2
        </a>
      </li>)}
      {visibilities.tier3 && (<li className="nav__item nav__item--flch">
        <a
          role="button"
          tabIndex="-1"
          onClick={() => handleClick('Tier 3')}
        >
          Tier 3
        </a>
      </li>)}
      {visibilities.tier4 && (<li className="nav__item nav__item--flch">
        <a
          role="button"
          tabIndex="-1"
          onClick={() => handleClick('Tier 4')}
        >
          Tier 4
        </a>
      </li>)}
      {visibilities.faction && (<li className="nav__item nav__item--flch">
        <a
          role="button"
          tabIndex="-1"
          onClick={() => handleClick('Faction Items')}
        >
          Faction Items
        </a>
      </li>)}
      {visibilities.fidgetingWriter && (<li className="nav__item nav__item--flch">
        <a
          role="button"
          tabIndex="-1"
          onClick={() => handleClick('Fidgeting Writer')}
        >
          Fidgeting Writer
        </a>
      </li>)}
    </Fragment>
  );
}

MenuItems.propTypes = {
  preferences: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = ({ preferences }) => ({ preferences });

export default connect(mapStateToProps)(MenuItems);
