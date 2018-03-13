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

// Toggle between 'expanded' and 'contracted' states
export function toggleState(props) {
  const { category, preferences: { expansions } } = props;
  const expanded = expansions[category];
  props.setCategoryExpansion({ category, expanded: !expanded });
}


export function mapStateToProps(state) {
  return { preferences: state.preferences };
}

// A Category is the container for a list of items. The component
// is only added if the user's preferences ask for it to be visible,
// so we don't need to check that here. What we *do* do here is decide
// whether to show it as expanded or contracted.
function Category({ children, preferences, category, categoryName }) {
  return (
    <div>
      <h3 className="heading heading--3">{categoryName}</h3>
      <div className="row">
        <ul className="items items--inline">
          {children}
        </ul>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { setCategoryExpansion })(Category);
