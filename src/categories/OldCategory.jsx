import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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

// A Category is the container for a list of items. The component
// is only added if the user's preferences ask for it to be visible,
// so we don't need to check that here. What we *do* do here is decide
// whether to show it as expanded or contracted.
export function Category(props) {
  const {
    preferences: { expansions },
    category,
  } = props;
  const expanded = expansions[category];
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  return (
    <div>
      <h3 onClick={() => toggleState(props)} className="flch-category-header">
        <CategoryToggle state={expanded} />
        {' '}
        <span className="flch-category-header__text">{props.categoryName}</span>
      </h3>
      <ul className={classnames('you_icon cf', expanded || 'flch-contracted')}>
        {props.children}
      </ul>
    </div>
  );
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
}

// Toggle between 'expanded' and 'contracted' states
export function toggleState(props) {
  const { category, preferences: { expansions } } = props;
  const expanded = expansions[category];
  props.setCategoryExpansion({ category, expanded: !expanded });
}


export function mapStateToProps(state) {
  return { preferences: state.preferences };
}

export default connect(mapStateToProps, { setCategoryExpansion })(Category);
