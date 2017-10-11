import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryOption from './CategoryOption';
import categories from './categories';

// The Popup component displays the current state of our display
// preferences and updates the preference storage when we make
// changes. The content script is listening for storage changes, so
// we don't need to construct any sort of link between popup and
// content script.
function Popup(props) {
  const categoryKeys = ['tier1', 'tier2', 'tier3', 'tier4', 'faction', 'fidgetingWriter'];
  const { preferences } = props;

  // Wait for preferences to be loaded
  if (!preferences) {
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
