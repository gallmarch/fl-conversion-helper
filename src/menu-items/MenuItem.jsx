import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getVisibleItems from '../shared/getVisibleItems';
import scrollToComponentByName from './scrollToComponentByName';

export class MenuItem extends Component {
  handleClick = () => {
    const { name } = this.props;
    scrollToComponentByName(name);
  }

  render = () => {
    const { name, items, visibleItems } = this.props;
    const isVisible = id => visibleItems[id];

    if (!items.filter(isVisible).length) {
      return null;
    }

    return (
      <li className="nav__item nav__item--flch">
        <button
          className="button--link nav__button button--link-inverse menu-item--inverse"
          onClick={this.handleClick}
          tabIndex="-1"
        >
          {name}
        </button>
      </li>
    );
  }
}

MenuItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
  name: PropTypes.string.isRequired,
  visibleItems: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({ visibleItems: getVisibleItems(state) });

export default connect(mapStateToProps)(MenuItem);
