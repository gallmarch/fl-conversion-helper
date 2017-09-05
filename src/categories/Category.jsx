import React from 'react';
import { connect } from 'react-redux';
import CategoryToggle from './CategoryToggle';
import { setExpanded } from './actions';

function Category(props) {
  const { preferences, category } = props;
  const expanded = preferences[category];
  return (
    <div>
      <h3 onClick={() => toggleState(props)} className="flch-category-header">
        <CategoryToggle state={preferences[category]} />
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
  const { category, preferences, setExpanded } = props;
  const expanded = preferences[category];
  setExpanded({ category, expanded: !expanded });
}


function mapStateToProps(state) {
  return { preferences: state.preferences };
}

export default connect(mapStateToProps, { setExpanded })(Category);
