import React from 'react';
import { connect } from 'react-redux';
import CategoryOption from './CategoryOption';
import categories from './categories';

function Popup(props) {
  const categoryKeys = ['tier1', 'tier2', 'tier3', 'tier4', 'faction'];
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

function mapStateToProps(state) {
  console.info('mapping state to props');
  console.info(state);
  return { ...state.preferences };
}

export default connect(mapStateToProps)(Popup);
