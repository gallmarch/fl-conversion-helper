import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryToggle from './CategoryToggle';
import { setCategoryExpansion } from '../preferences/actions';

Category.propTypes = {
  preferences: PropTypes.shape({
    expansions: PropTypes.object.isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Category(props) {
  const { preferences: { expansions }, category } = props;
  const expanded = expansions[category];
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
}

function toggleState(props) {
  const { category, preferences: { expansions } } = props;
  const expanded = expansions[category];
  props.setCategoryExpansion({ category, expanded: !expanded });
}


function mapStateToProps(state) {
  return { preferences: state.preferences };
}

export default connect(mapStateToProps, { setCategoryExpansion })(Category);
