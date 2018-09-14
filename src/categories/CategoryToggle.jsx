import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// CategoryToggle is the purely presentational component
// that switches between a '+' (when the containing Category
// is contracted) and '-' (expanded).
export default function CategoryToggle(props) {
  const { onClick, expanded } = props;
  return (
    <a
      className="fa fa-stack inverse"
      onClick={onClick}
      tabIndex="-1"
      role="button"
      style={{ fontSize: '12px' }}
    >
      <i className="fa fa-stack-2x fa-circle" />
      <i className={classnames('fa fa-stack fa-inverse fa-stack-1x', expanded ? 'fa-minus' : 'fa-plus')} />
    </a>
  );
  /*
  if (expanded) {
    return <span className="contract">-</span>;
  }
  return <span className="expand">+</span>;
  */
}

CategoryToggle.propTypes = {
  expanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CategoryToggle.defaultProps = {
  expanded: false,
};
