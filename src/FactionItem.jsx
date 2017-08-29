import React from 'react';
import { connect } from 'react-redux';
import { items } from './factions';
import { favoursRequired } from './favours-required';
import { getInventoryMatch } from './Item';
import BlankItem from './BlankItem';
import UsableItem from './UsableItem';
import DummiedItem from './DummiedItem';

function FactionItem(props) {
  const { factions: { favours, renown }, id } = props;
  const faction = items[id];
  const inventoryMatch = getInventoryMatch(id);

  const factionFavours = favours[faction];
  const convertible = (
    factionFavours >= favoursRequired(renown[faction])
  );

  if (!inventoryMatch) {
    return <BlankItem />;
  }

  if (convertible) {
    return (
      <UsableItem
        inventoryMatch={inventoryMatch}
        quantity={factionFavours}
      >
      </UsableItem>
    );
  }
  return <DummiedItem
    inventoryMatch={inventoryMatch}
    quantity={factionFavours}
  />;
}

function mapStateToProps(state) {
  return { factions: state.factions };
}

export default connect(mapStateToProps)(FactionItem);
