import React from 'react';
import * as PropTypes from 'prop-types';
import CategoryToggle from '../CategoryToggle';

export default function CategoryComponent(props) {
  const { children, expanded, heading, onToggleExpanded } = props;
  if (!children.length) {
    return null;
  }
  return (
    <div>
      <div>
        <h3
          className="heading heading--2"
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
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
