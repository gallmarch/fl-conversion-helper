import React from 'react';
import { connect } from 'react-redux';
import CategoryOption from './CategoryOption';
import categories from './categories';

function Popup(props) {
  const categoryKeys = ['tier-1', 'tier-2', 'tier-3', 'tier-4', 'renown'];
  console.info('categories!');
  console.info(categories);
  // const { preferences } = props;
  // console.info ('preferences');
  // console.info(preferences);
  return (
    <div>
      <h1 className="flch-popup__header">Show categories</h1>
      {categoryKeys.map(key => <CategoryOption key={key} category={categories[key]} />)}
    </div>
  );
}

function mapStateToProps(state) {
  return { preferences: state.preferences };
}

export default Popup;

// export default connect(mapStateToProps)(Popup);
