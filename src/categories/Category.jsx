import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCategoryExpansion } from '../preferences/actions';
import CategoryToggle from './CategoryToggle';

export function CategoryComponent(props) {
  const { children, expanded, heading, onToggleExpanded } = props;
  if (!children.length) {
    return null;
  }
  return (
    <div>
      <div>
        <h3 className="heading heading--3" style={{ display: 'flex', justifyContent: 'space-between' }}>
          {heading}
          <CategoryToggle expanded={expanded} onClick={onToggleExpanded} />
        </h3>
        {expanded && (
          <div className="row">
            <ul className="items items--inline inventory-group__items">
              {children}
            </ul>
          </div>
        )}
        <hr />
      </div>
    </div>
  );
}

CategoryComponent.propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  onToggleExpanded: PropTypes.func.isRequired,
};

export class Category extends Component {
  constructor(props) {
    super(props);
    this.handleToggleExpanded = this.handleToggleExpanded.bind(this);
    this.state = { expanded: false };
  }

  handleToggleExpanded() {
    const { expanded, name } = this.props;
    this.props.setCategoryExpansion({
      category: name,
      expanded: !expanded,
    });
  }

  render() {
    return (
      <CategoryComponent
        {...this.props}
        onToggleExpanded={this.handleToggleExpanded}
      />
    );
  }
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  setCategoryExpansion: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { setCategoryExpansion })(Category);
