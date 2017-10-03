import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryOption from './CategoryOption';
import categories from './categories';

function Popup(props) {
  const categoryKeys = ['tier1', 'tier2', 'tier3', 'tier4', 'faction', 'fidgetingWriter'];
  const { preferences } = props;

  // Wait for preferences to be loaded
  if (!preferences) {
    console.info('oops no preferences prop yet');
    return null;
  }

  return (
    <div>
      <h1 className="flch-popup__header">Show categories</h1>
      {categoryKeys.map(key => (
        <CategoryOption key={key} category={categories[key]} preferences={preferences} />
      ))}
    </div>
  );
}

Popup.propTypes = {
  preferences: PropTypes.shape({
    expansions: PropTypes.object,
    visibilities: PropTypes.object,
  }),
};
Popup.defaultProps = {
  preferences: {
    expansions: {},
    visibilities: {},
  },
};

function mapStateToProps(state) {
  return { ...state.preferences };
}

export default connect(mapStateToProps)(Popup);
