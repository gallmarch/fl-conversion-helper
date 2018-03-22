import React, { Fragment } from 'react';
import scrollTo from './scrollTo';

import { connect } from 'react-redux';

// Taken from:
// https://github.com/flyingant/react-scroll-to-component/blob/1d11ffa525dec9ade68a3f4b52612ed4a17716af/index.js
function calculateScrollOffset(element, offset, alignment) {
	var body = document.body,
			html = document.documentElement;
	var elementRect = element.getBoundingClientRect();
	var clientHeight = html.clientHeight;
	var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
																 html.clientHeight, html.scrollHeight, html.offsetHeight );
	offset = offset || 0; // additional offset to top
	var scrollPosition;
	switch(alignment) {
			case 'top': scrollPosition = elementRect.top; break;
			case 'middle': scrollPosition = elementRect.bottom - clientHeight / 2 - elementRect.height / 2; break;
			case 'bottom': scrollPosition = elementRect.bottom - clientHeight; break;
			default: scrollPosition = elementRect.bottom - clientHeight / 2 - elementRect.height / 2; break; //defaul to middle
		}
	var maxScrollPosition = documentHeight - clientHeight;
	return Math.min(scrollPosition + offset + window.pageYOffset,
									maxScrollPosition);
}

function handleClick(name) {
  const element = [...document.querySelectorAll('h3.heading--3')].find(_ => _.innerText.trim() === name);
  if (!element) {
    return;
  }
  const scrollOffset = calculateScrollOffset(element, 0, 'top');
  return scrollTo({
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
        <a onClick={() => handleClick('Tier 1')}>Tier 1</a>
      </li>)}
      {visibilities.tier2 && (<li className="nav__item nav__item--flch">
        <a onClick={() => handleClick('Tier 2')}>Tier 2</a>
      </li>)}
      {visibilities.tier3 && (<li className="nav__item nav__item--flch">
        <a onClick={() => handleClick('Tier 3')}>Tier 3</a>
      </li>)}
      {visibilities.tier4 && (<li className="nav__item nav__item--flch">
        <a onClick={() => handleClick('Tier 4')}>Tier 4</a>
      </li>)}
      {visibilities.faction && (<li className="nav__item nav__item--flch">
        <a onClick={() => handleClick('Faction Items')}>Faction Items</a>
      </li>)}
      {visibilities.fidgetingWriter && (<li className="nav__item nav__item--flch">
        <a onClick={() => handleClick('Fidgeting Writer')}>Fidgeting Writer</a>
      </li>)}
    </Fragment>
  );
}

function mapState({ preferences }) {
  return { preferences };
}

export default connect(mapState)(MenuItems);
