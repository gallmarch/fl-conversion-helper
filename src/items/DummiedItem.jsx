import React from 'react';
import { cloneImage, cloneTooltip, renderCustomTooltip } from './Item';

export default function DummiedItem(props) {
  const { quantity, inventoryMatch, message } = props;
  return (
    <li>
      <a className="tooltip flch-unlock">
        <div className="qq">{quantity}</div>
        <div>
          {cloneImage(inventoryMatch.querySelector('img'))}
        </div>
        {(!!message && renderCustomTooltip(inventoryMatch, message)) || cloneTooltip(inventoryMatch)}
      </a>
    </li>
  );
}
