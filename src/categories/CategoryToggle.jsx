import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// CategoryToggle is the purely presentational component
// that switches between a '+' (when the containing Category
// is contracted) and '-' (expanded).
export default function CategoryToggle(props) {
  const { onClick, expanded } = props;
  return (
    <button
      className="button--link button--link-inverse"
      type="button"
      tabIndex="-1"
      onClick={onClick}
      style={{ fontSize: '14px' }}
    >
      <span className="fa fa-stack">
        <i className="fa fa-stack-2x fa-circle" />
        <i className={classnames('fa fa-stack fa-inverse fa-stack-1x', expanded ? 'fa-minus' : 'fa-plus')} />
      </span>
    </button>
  );
}

CategoryToggle.propTypes = {
  expanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CategoryToggle.defaultProps = {
  expanded: false,
};
