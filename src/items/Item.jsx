import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MatchingItem from './MatchingItem';
import MissingItem from './MissingItem';
import { findMatch } from './selectors';

export const IMAGE_ROOT = '//images.fallenlondon.com/images/icons_small';

function Item({ alwaysConvertible, enablementPreference, match, id }) {
  if (!match) {
    return <MissingItem />;
  }

  return (
    <MatchingItem
      alwaysConvertible={alwaysConvertible}
      id={id}
      match={match}
      enablementPreference={enablementPreference}
    />
  );
}

Item.propTypes = {
  alwaysConvertible: PropTypes.bool,
  enablementPreference: PropTypes.number.isRequired,
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.number.isRequired,
};

Item.defaultProps = {
  alwaysConvertible: false,
  match: null,
};

// function mapState({ possessions: { filterString }, preferences }) {
const mapStateToProps = (state, props) => ({
  match: findMatch(state, props),
});

export default connect(mapStateToProps)(Item);
