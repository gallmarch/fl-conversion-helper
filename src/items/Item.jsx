import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useQuality } from './actions';
import MatchingItem from './MatchingItem';
import MissingItem from './MissingItem';
import { findMatch } from './selectors';

export const IMAGE_ROOT = '//images.fallenlondon.com/images/icons_small';

function Item({ match, id }) {
  if (!match) {
    return <MissingItem />;
  }

  return <MatchingItem id={id} match={match} />;
}

Item.propTypes = {
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.number.isRequired,
};

Item.defaultProps = {
  match: null,
};

// function mapState({ possessions: { filterString }, preferences }) {
const mapStateToProps = (state, props) => ({
  match: findMatch(state, props),
});

export default connect(mapStateToProps, { useQuality })(Item);
