import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DummiedItem from './DummiedItem';
import UsableItem from './UsableItem';
import { getFailureExplanation, isUsable } from './selectors';

function FactionItem(props) {
  const {
    element,
    favours,
    data: rawData,
  } = props;

  const data = {
    ...rawData,
    // Show 'X Favours' as the quantity
    level: favours,
    textualLevel: `${favours} Favour${favours === 1 ? '' : 's'}`,
  };

  if (!isUsable) {
    const { failureExplanation } = props;
    return (
      <DummiedItem
        data={{
          ...data,
          secondaryDescription: `${data.secondaryDescription ? data.secondaryDescription : ''}<p><i>${failureExplanation}</i></p>`,
        }}
        element={element}
      />
    );
  }

  return (
    <UsableItem data={{ ...data, level: favours }} element={element} />
  );
}

FactionItem.propTypes = {
  attributes: PropTypes.object.isRequired, // eslint-disable-line
  data: PropTypes.object.isRequired, // eslint-disable-line
  element: PropTypes.element.isRequired,
  failureExplanation: PropTypes.string.isRequired,
  favours: PropTypes.number.isRequired,
  myself: PropTypes.object.isRequired, // eslint-disable-line
  preferences: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = (state, props) => ({
  failureExplanation: getFailureExplanation(state, props),
  favours: state.myself.favours[props.id],
  isUsable: isUsable(state, props),
});

export default connect(mapStateToProps)(FactionItem);
