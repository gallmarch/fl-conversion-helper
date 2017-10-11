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
  // Look for a DOM element in the inventory that has this item ID. This tells
  // us whether we have any of the item at all.
  const inventoryMatch = document.querySelector(`div#infoBarQImage${id}`);

  // If we have a non-zero amount of the item, decide whether to show it as
  // convertible or non-convertible
  if (inventoryMatch) {
    const quantity = Number(inventoryMatch.parentNode.querySelector('div.qq').innerText);
    // Tales of Terror live in two categories --- in Tier 3, it only makes
    // sense to convert if you have 50 or more, but as the start of the Fidgeting
    // Writer you probably want to be able to convert any ToT you have --- so
    // we'll check for a prop that overrides checking the usual conversion 
    // requirements.
    const canConvert = alwaysConvertible || quantity >= conversionCost(id);

    // If we can convert this item, then display it as clickable
    if (canConvert) {
      // In areas where we can't use items (e.g., Menace areas), we might as well
      // add the standard red border to indicate this
      const isDisabled = inventoryMatch.parentElement.classList.contains('disabled');
      return (
        <UsableItem
          {...rest}
          inventoryMatch={inventoryMatch}
          quantity={quantity}
          isDisabled={isDisabled}
        />
      );
    }

    // If we can't convert the item, show it as disabled and unclickable
    return (
      <DummiedItem {...rest} inventoryMatch={inventoryMatch} quantity={quantity}>
        <div className="qq">{quantity}</div>
        <div>
          {cloneImage(inventoryMatch.querySelector('img'))}
        </div>
      </DummiedItem>
    );
  }

  // If we don't have the item *at all*, show a blank
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

// Given an image node, return a React-controllable clone of the image.
// The existence (or otherwise) of alt-text is determined entirely by the
// image we're cloning (which we can't change), so we'll hush ESLint.
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

// If we just want an exact copy of a tooltip, we can go ahead and clone it
// like this. If there's malicious code in the tooltip HTML, then it's already
// on the page, and there's nothing we can do about it, so we'll hush ESLint.
function cloneTooltip(node) {
  // Find the node's tooltip
  const ttNode = node.parentNode.querySelector('span.tt');
  // eslint-disable-next-line react/no-danger
  return <span className="tt" dangerouslySetInnerHTML={{ __html: ttNode.innerHTML }} />;
}

// If we want to amend the tooltip --- e.g., to explain why we're not letting
// the user click on a faction item --- then we can just clone the DOM node,
// amend the clone's tooltip text, and return it in a span. Again, if there's
// anything malicious in the tooltip, then it's already on the page, so we'll
// hush ESLint.
function renderCustomTooltip(node, message) {
  // Find the node's tooltip
  const ttNode = node.parentNode.querySelector('span.tt');
  // Clone the tooltip
  const clone = ttNode.cloneNode(true);
  // If we have two <strong> elements, then the second is
  // the message that we're replacing.
  const strongs = clone.querySelectorAll('strong');
  if (strongs.length >= 2) {
    strongs[1].textContent = message;
  }
  // eslint-disable-next-line react/no-danger
  return <span className="tt" dangerouslySetInnerHTML={{ __html: clone.innerHTML }} />;
}
