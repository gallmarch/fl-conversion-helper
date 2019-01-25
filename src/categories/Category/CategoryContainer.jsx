import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCategoryExpansion } from '../../preferences/actions';
import CategoryComponent from './CategoryComponent';


export class CategoryContainer extends Component {
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
    const { children, ...rest } = this.props;
    return (
      <CategoryComponent
        {...rest}
        onToggleExpanded={this.handleToggleExpanded}
      >
        {children}
      </CategoryComponent>
    );
  }
}

CategoryContainer.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  setCategoryExpansion: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { setCategoryExpansion })(CategoryContainer);
