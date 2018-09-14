import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { items as factionItems } from '../factions/items';
import { TIERS } from '../preferences/constants';
import { useQuality } from './actions';
import BlankItem from './BlankItem';
import DummiedItem from './DummiedItem';
import FactionItem from './FactionItem';
import UsableItem from './UsableItem';
import conversionCost from './conversionCost';
import { findMatch } from './util';

import getIsConvertible from './isConvertible';

export const IMAGE_ROOT = '//images.fallenlondon.com/images/icons_small';

class Item extends Component {
  constructor(props) {
    super(props);
    this.isConvertible = this.isConvertible.bind(this);
    this.findMatch = findMatch.bind(this);
  }

  isConvertible({ id, quantity }) {
    const { alwaysConvertible, enablementPreference } = this.props;
    if (alwaysConvertible) {
      console.info('alwaaaays convertible');
      return true;
    }
    if (enablementPreference === TIERS.ALWAYS) {
      return true;
    }
    return quantity >= conversionCost(id, enablementPreference === TIERS.SMALL);
  }

  render() {
    const { filterString, id, isConvertible } = this.props;
    const match = this.findMatch();

    if (!match) {
      // If the user is filtering, they don't want blank items
      if (filterString.length) {
        return null;
      }
      return <BlankItem />;
    }

    const { data: { name } } = match;

    if (!name.toLowerCase().includes(filterString.toLowerCase())) {
      return null;
    }

    if (Object.keys(factionItems).includes(id)) {
      return <FactionItem id={id} {...match} />;
    }

    if (isConvertible) {
      return <UsableItem {...match} />;
    }

    return <DummiedItem {...match} />;
  }
}

Item.propTypes = {
  alwaysConvertible: PropTypes.bool,
  enablementPreference: PropTypes.number.isRequired,
  filterString: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isConvertible: PropTypes.bool.isRequired,
};

Item.defaultProps = {
  alwaysConvertible: false,
};

// function mapState({ possessions: { filterString }, preferences }) {
const mapStateToProps = (state, props) => {
  const { possessions: { filterString } } = state;
  return {
    filterString,
    isConvertible: getIsConvertible(state, props),
  };
};

export default connect(mapStateToProps, { useQuality })(Item);
