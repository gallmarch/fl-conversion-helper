import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToolTip from '../tooltips/ToolTip';

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
    this.findMatch = findMatch.bind(this);
  }

  render() {
    const match = this.findMatch();

    if (!match) {
      return <BlankItem />;
    }

    const { id } = this.props;
    if (Object.keys(factionItems).includes(id)) {
      return <FactionItem id={id} {...match} />;
    }

    // Do we have enough of this item to do a conversion?
    const { enablementPreference } = this.props;
    const { data: { Level: quantity } } = match;

    if (this.isConvertible({ id, quantity })) {
      return <UsableItem {...match} />;
    }
    return <DummiedItem {...match} />;
  }

  isConvertible({ id, quantity }) {
    const { alwaysConvertible, enablementPreference } = this.props;
    if (alwaysConvertible) {
      return true;
    }
    if (enablementPreference === TIERS.ALWAYS) {
      return true;
    }
    return quantity >= conversionCost(id, enablementPreference === TIERS.SMALL);
  }
}

function mapState({ possessions, preferences }) {
  return { possessions: possessions.possessions, preferences };
}

export default connect(mapState, { useQuality })(Item);
