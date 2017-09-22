/* eslint-disable jsx-a11y/href-no-hash */
// Fallen London uses <a href="#"> for its clickable items too
import React from 'react';
import PropTypes from 'prop-types';
import { cloneImage, cloneTooltip } from './Item';
import { validateDOMElement } from '../util';

export default function UsableItem(props) {
  const { inventoryMatch, isDisabled, quantity } = props;
  return (
    <li>
      <a className={"tooltip usableitem" + (isDisabled ? ' disabled' : '')} onClick={() => inventoryMatch.parentNode.click()}>
        <div className="qq">{quantity}</div>
        <div>
          {cloneImage(inventoryMatch.querySelector('img'))}
        </div>
        {cloneTooltip(inventoryMatch)}
        {props.children}
      </a>
    </li>
  );
}

UsableItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  inventoryMatch: validateDOMElement.isRequired,
  quantity: PropTypes.number.isRequired,
};

UsableItem.defaultProps = {
  children: null,
};

