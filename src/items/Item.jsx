import React from 'react';
import PropTypes from 'prop-types';
import { conversionCost } from '.';
import BlankItem from './BlankItem';
import UsableItem from './UsableItem';
import DummiedItem from './DummiedItem';

function getInventoryMatch(id) {
  return document.querySelector(`div#infoBarQImage${id}`);
}

export { getInventoryMatch, cloneImage, cloneTooltip, renderCustomTooltip };

export default function Item({ id, message, alwaysConvertible, ...rest }) {
  const inventoryMatch = document.querySelector(`div#infoBarQImage${id}`);
  if (inventoryMatch) {
    const quantity = Number(inventoryMatch.parentNode.querySelector('div.qq').innerText);
    // Some item categories are never disabled
    const canConvert = alwaysConvertible || quantity >= conversionCost(id);
    if (canConvert) {
      return (
        <UsableItem {...rest} inventoryMatch={inventoryMatch} quantity={quantity} />
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

Item.propTypes = {
  alwaysConvertible: PropTypes.bool,
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
};

Item.defaultProps = {
  alwaysConvertible: false,
  message: undefined,
};

function cloneImage(node) {
  const attributes = [
    'height',
    'width',
    'src',
    'alt',
  ].reduce((acc, attr) => ({ ...acc, [attr]: node.getAttribute(attr) }), {});
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...attributes} />;
}

function cloneTooltip(node) {
  const ttNode = node.parentNode.querySelector('span.tt');
  // eslint-disable-next-line react/no-danger
  return <span className="tt" dangerouslySetInnerHTML={{ __html: ttNode.innerHTML }} />;
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
  // eslint-disable-next-line react/no-danger
  return <span className="tt" dangerouslySetInnerHTML={{ __html: clone.innerHTML }} />;
}
