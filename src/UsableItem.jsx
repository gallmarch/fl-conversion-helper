import React from 'react';
import { cloneImage, cloneTooltip } from './Item';

export default function UsableItem(props) {
  const { inventoryMatch, quantity } = props;
  return (
    <li>
      <a href="#" className="tooltip usableitem" onClick={() => inventoryMatch.parentNode.click()}>
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
