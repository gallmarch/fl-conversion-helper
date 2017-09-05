import React from 'react';
import { connect } from 'react-redux';
import { items } from '../factions';
import { attributeRequired, favoursRequired } from '../renown-requirements';
import { getInventoryMatch } from './Item';
import BlankItem from './BlankItem';
import UsableItem from './UsableItem';
import DummiedItem from './DummiedItem';
import factionAttributes from '../factions/attributes';

function meetsAttributeRequirement({ attributes, faction, renown }) {
  const { attribute, level } = attributeRequired(faction, renown[faction]);
  return attributes[attribute] >= level;
}

function FactionItem(props) {
  const { attributes, factions: { favours, renown }, id } = props;
  // Look for the faction's item in our inventory
  const inventoryMatch = getInventoryMatch(id);
  // If we don't have the item, then return a blank
  if (!inventoryMatch) {
    return <BlankItem />;
  }

  // Check whether we meet the attribute requirement and have enough
  // Favours to perform a conversion
  const faction = items[id];
  const factionFavours = favours[faction];
  const hasEnoughFavours = factionFavours >= favoursRequired(renown[faction]);
  const hasAttributeLevel = meetsAttributeRequirement({ attributes, faction, renown });

  const convertible = hasEnoughFavours && hasAttributeLevel;

  // If we are in a position to convert, then display an enabled item
  if (convertible) {
    return (
      <UsableItem
        inventoryMatch={inventoryMatch}
        quantity={factionFavours}
      >
      </UsableItem>
    );
  }

  // If, for either reason, we can't convert, display a dummied-out item
  return <DummiedItem
    inventoryMatch={inventoryMatch}
    quantity={factionFavours}
  />;
}

function mapStateToProps(state) {
  return {
    factions: state.factions,
    attributes: state.attributes,
  };
}

export default connect(mapStateToProps)(FactionItem);
