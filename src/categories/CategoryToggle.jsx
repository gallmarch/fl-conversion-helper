import React from 'react';
import PropTypes from 'prop-types';

// CategoryToggle is the purely presentational component
// that switches between a '+' (when the containing Category
// is contracted) and '-' (expanded).
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
