import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryToggle(props) {
  if (props.state) {
    return <span className="contract">-</span>;
  }
  return <span className="expand">+</span>;
}

CategoryToggle.propTypes = {
  state: PropTypes.bool,
};

CategoryToggle.defaultProps = {
  state: false,
};
