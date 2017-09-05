import React from 'react';
import { connect } from 'react-redux';
import CategoryToggle from './CategoryToggle';
import { setCategoryExpansion } from '../preferences/actions';

function Category(props) {
  const { preferences: { expansions }, category } = props;
  const expanded = expansions[category];
  return (
    <div>
      <h3 onClick={() => toggleState(props)} className="flch-category-header">
        <CategoryToggle state={expanded} />
        {' '}
        <span className="flch-category-header__text">{props.categoryName}</span>
      </h3>
      {expanded && (
        <ul className="you_icon cf">
          {props.children}
        </ul>
      )}
    </div>
  );

}

function toggleState(props) {
  const { category, preferences: { expansions }, setCategoryExpansion } = props;
  const expanded = expansions[category];
  setCategoryExpansion({ category, expanded: !expanded });
}


function mapStateToProps(state) {
  return { preferences: state.preferences };
}

export default connect(mapStateToProps, { setCategoryExpansion })(Category);
