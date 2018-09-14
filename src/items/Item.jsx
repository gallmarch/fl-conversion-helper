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
    const { filterString } = this.props;

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

    const { id } = this.props;
    if (Object.keys(factionItems).includes(id)) {
      return <FactionItem id={id} {...match} />;
    }

    // Do we have enough of this item to do a conversion?
    const { data: { level: quantity } } = match;

    console.info(`${name} x ${quantity} is convertible? ${this.isConvertible({ id, quantity })}`);

    if (this.isConvertible({ id, quantity })) {
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
};

Item.defaultProps = {
  alwaysConvertible: false,
};

function mapState({ possessions, preferences }) {
  return {
    filterString: possessions.filterString,
    possessions: possessions.possessions,
    preferences,
  };
}

export default connect(mapState, { useQuality })(Item);
