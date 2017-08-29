import React from 'react';
import { conversionCost } from './items';
import BlankItem from './BlankItem';
import UsableItem from './UsableItem';
import DummiedItem from './DummiedItem';

function getInventoryMatch(id) {
  return document.querySelector(`div#infoBarQImage${id}`);
}

export { getInventoryMatch, cloneImage, cloneTooltip };

export default function Item({ id, ...rest }) {
  const inventoryMatch = document.querySelector(`div#infoBarQImage${id}`);
  if (inventoryMatch) {
    const quantity = Number(inventoryMatch.parentNode.querySelector('div.qq').innerText);
    const canConvert = quantity >= conversionCost(id);
    if (canConvert) {
      return (
        <UsableItem {...rest} inventoryMatch={inventoryMatch} quantity={quantity}>
        </UsableItem>
      );
    }
    return (
      <DummiedItem inventoryMatch={inventoryMatch} quantity={quantity}>
          <div className="qq">{quantity}</div>
          <div>
            {cloneImage(inventoryMatch.querySelector('img'))}
          </div>
          {cloneTooltip(inventoryMatch)}
      </DummiedItem>
    );
  }
  return <BlankItem id={id} />;
}

function cloneImage(node) {
  const attributes = [
  'height',
  'width',
  'src',
  'alt'
  ].reduce((acc, attr) => ({...acc, [attr]: node.getAttribute(attr)}), {})
  return (
    <img
      {...attributes}
    />
    );
}

function quantity(node) {
  const qqNode = node.parentNode.querySelector('div.qq');
  return <div className="qq">{qqNode.innerText}</div>;
}

function cloneTooltip(node) {
  const ttNode = node.parentNode.querySelector('span.tt');
  return (
    <span className="tt" dangerouslySetInnerHTML={
      { __html: ttNode.innerHTML }
    } />
  );
}
