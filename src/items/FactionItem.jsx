import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getFaction from '../factions/getFaction';

import DummiedItem from './DummiedItem';
import UsableItem from './UsableItem';
import { getFailureExplanation, isUsableFaction } from './selectors';

function FactionItem(props) {
  const {
    data,
    element,
    favours,
    isUsable,
  } = props;

  // Show 'X Favours' as the quantity
  const textualLevel = `${favours} Favour${favours === 1 ? '' : 's'}`;

  if (!isUsable) {
    const { failureExplanation } = props;

    return (
      <DummiedItem
        data={{
          ...data,
          textualLevel,
          level: favours,
          secondaryDescription: `${data.secondaryDescription ? data.secondaryDescription : ''}<p><i>${failureExplanation}</i></p>`,
        }}
        element={element}
      />
    );
  }

  return (
    <UsableItem data={{ ...data, textualLevel, level: favours }} element={element} />
  );
}

FactionItem.propTypes = {
  attributes: PropTypes.object.isRequired, // eslint-disable-line
  data: PropTypes.object.isRequired, // eslint-disable-line
  element: PropTypes.object.isRequired, // eslint-disable-line
  failureExplanation: PropTypes.string,
  favours: PropTypes.number.isRequired,
  isUsable: PropTypes.bool.isRequired,
};

FactionItem.defaultProps = {
  failureExplanation: null,
};

const mapStateToProps = (state, props) => ({
  failureExplanation: getFailureExplanation(state, props),
  favours: state.myself.favours[getFaction(props.id)],
  isUsable: isUsableFaction(state, props),
});

export default connect(mapStateToProps)(FactionItem);
