import $ from 'jquery';
import React from 'react';
import { conversionCost } from '.';
import BlankItem from './BlankItem';
import UsableItem from './UsableItem';
import DummiedItem from './DummiedItem';

function getInventoryMatch(id) {
  return document.querySelector(`div#infoBarQImage${id}`);
}

export { getInventoryMatch, cloneImage, cloneTooltip, renderCustomTooltip };

export default function Item({ id, message, ...rest }) {
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
      <DummiedItem {...rest} inventoryMatch={inventoryMatch} quantity={quantity}>
          <div className="qq">{quantity}</div>
          <div>
            {cloneImage(inventoryMatch.querySelector('img'))}
          </div>
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

function renderCustomTooltip(node, message) {
  const ttNode = node.parentNode.querySelector('span.tt');
  // If we have two <strong> elements, then the second is
  // the message that we're replacing.
  const clone = ttNode.cloneNode(true);
  const strongs = clone.querySelectorAll('strong');
  if (strongs.length >= 2) {
    strongs[1].textContent = message;
  }
  return (
    <span className="tt" dangerouslySetInnerHTML={
      { __html: clone.innerHTML }
    } />
  );
}
