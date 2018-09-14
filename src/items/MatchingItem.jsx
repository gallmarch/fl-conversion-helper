import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { items as factionItems } from '../factions/items';

import { getIsConvertible } from './selectors';

import DummiedItem from './DummiedItem';
import FactionItem from './FactionItem';
import UsableItem from './UsableItem';

function MatchingItem({ filterString, data, id, isConvertible }) {
  // Render nothing if filtered out
  if (!name.toLowerCase().includes(filterString.toLowerCase())) {
    return null;
  }

  // If this is a faction item, render a FactionItem
  if (Object.keys(factionItems).includes(id)) {
    return <FactionItem id={id} {...data} />;
  }

  // If this is convertible, render a UsableItem
  if (isConvertible) {
    return <UsableItem {...data} />;
  }

  // Not convertible; render a DummiedItem
  return <DummiedItem {...data} />;
}

MatchingItem.propTypes = {
  filterString: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.number.isRequired,
  isConvertible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, props) => ({
  filterString: state.possessions.filterString,
  isConvertible: getIsConvertible(state, props),
});

export default connect(mapStateToProps)(MatchingItem);
