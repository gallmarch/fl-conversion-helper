import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getVisibleItems from '../shared/getVisibleItems';

function MenuItem(props) {
  const { onClick, name, items, visibleItems } = props;
  const isVisible = id => visibleItems[id];

  if (!items.filter(isVisible).length) {
    return null;
  }

  return (
    <li className="nav__item nav__item--flch">
      <a
        role="button"
        onClick={onClick}
        tabIndex="-1"
      >
        {name}
      </a>
    </li>
  );
}

MenuItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  visibleItems: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({ visibleItems: getVisibleItems(state) });

export default connect(mapStateToProps)(MenuItem);
