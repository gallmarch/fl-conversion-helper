import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { items } from '../factions';
import {
  attributeRequired,
  createFailureMessage,
  favoursRequired,
  meetsAttributeRequirement,
} from '../factions/requirements';
import { FACTIONS } from '../preferences/constants';
import { getInventoryMatch } from './Item';
import BlankItem from './BlankItem';
import UsableItem from './UsableItem';
import DummiedItem from './DummiedItem';
import { attributeName } from '../attributes/names';

export {
  isConvertible,
  FactionItem,
};

FactionItem.propTypes = {
  attributes: PropTypes.objectOf(PropTypes.number).isRequired,
  enablementPreference: PropTypes.number.isRequired,
  factions: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

// Faction items are enabled either if
// (a) the user wants them always to be enabled, or
// (b) the user has enough Favours and a high enough level in the relevant
//     attribute.
function isConvertible({
  attributes,
  enablementPreference,
  faction,
  factionFavours,
  factionRenown,
  renown,
}) {
  // If the user always wants to convert, then return true
  if (enablementPreference === FACTIONS.ALWAYS) {
    return true;
  }

  // Check whether we meet the attribute requirement and have enough
  // Favours to perform a conversion
  const hasEnoughFavours = factionFavours >= favoursRequired(factionRenown);
  const hasAttributeLevel = meetsAttributeRequirement({ attributes, faction, renown });
  return hasEnoughFavours && hasAttributeLevel;
}

function FactionItem(props) {
  const {
    attributes,
    enablementPreference,
    factions: { favours, renown },
    id,
  } = props;
  // Look for the faction's item in our inventory
  const inventoryMatch = getInventoryMatch(id);

  // If we don't have the item, then return a blank
  if (!inventoryMatch) {
    return <BlankItem />;
  }

  const faction = items[id];
  const factionFavours = favours[faction];
  const factionRenown = renown[faction];

  const convertible = isConvertible({
    attributes,
    enablementPreference,
    faction,
    factionFavours,
    factionRenown,
    renown,
  });

  // If we are enabled, then display an enabled item
  if (convertible) {
    return <UsableItem inventoryMatch={inventoryMatch} quantity={factionFavours} />;
  }

  // If, for some reason, we shouldn't be enabled, display a dummied-out item
  // with an explanation in the tooltip
  const message = createFailureMessage({
    attributes,
    favours,
    id,
    renown,
  });

  return (<DummiedItem
    inventoryMatch={inventoryMatch}
    quantity={factionFavours}
    message={message}
  />);
}


function mapStateToProps(state) {
  return {
    factions: state.factions,
    attributes: state.attributes,
  };
}

export default connect(mapStateToProps)(FactionItem);
