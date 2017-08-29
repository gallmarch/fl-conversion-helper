import React from 'react';
import { cloneImage, cloneTooltip } from './Item';

export default function DummiedItem(props) {
  const { quantity, inventoryMatch } = props;
  return (
    <li>
      <a className="tooltip flch-unlock">
        <div className="qq">{quantity}</div>
        <div>
          {cloneImage(inventoryMatch.querySelector('img'))}
        </div>
        {cloneTooltip(inventoryMatch)}
      </a>
    </li>
  );
}
