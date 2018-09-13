import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FACTIONS } from '../preferences/constants';

import factionAttributes from '../factions/attributes';
import { getFaction } from '../factions/items';
import { attributeLevelRequired, favoursRequired } from '../factions/requirements';
import DummiedItem from './DummiedItem';
import UsableItem from './UsableItem';

class FactionItem extends Component {
  constructor(props) {
    super(props);
    this.makeFailureExplanation = this.makeFailureExplanation.bind(this);
    this.isUsable = this.isUsable.bind(this);
  }

  isUsable() {
    const {
      // attributes,
      // id,
      // myself: { renown, favours },
      preferences: { enablements },
      // sidebar,
    } = this.props;

    if (enablements.factions === FACTIONS.ALWAYS) {
      return true;
    }

    const failureExplanation = this.makeFailureExplanation();

    return !failureExplanation;
  }

  makeFailureExplanation() {
    const { attributes, id, myself: { favours, renown } } = this.props;

    // Get this faction's attribute, Renown level, and Favours
    const faction = getFaction(id);
    const factionAttribute = factionAttributes[faction];
    const factionRenown = renown[faction];
    const factionFavours = favours[faction];

    // Check whether we meet the Favour and attribute requirements to convert at
    // this Renown level
    const hasEnoughFavours = factionFavours >= favoursRequired(factionRenown);
    const hasAttributeLevel = attributes[factionAttribute] >= attributeLevelRequired(factionRenown);

    // If we meet the requirements, then return null
    if (hasEnoughFavours && hasAttributeLevel) {
      return null;
    }

    // Otherwise, build a string to explain why the item is disabled
    const failureReasons = [];
    if (!hasEnoughFavours) {
      failureReasons.push(`${favoursRequired(factionRenown)} Favours (you have ${factionFavours})`);
    }
    if (!hasAttributeLevel) {
      failureReasons.push(`${factionAttribute} ${attributeLevelRequired(factionRenown)} (you have ${attributes[factionAttribute]})`);
    }
    return `You need ${failureReasons.join(' and ')}.`;
  }

  render() {
    const { data: rawData, id, element, myself: { favours } } = this.props;

    const factionFavours = favours[getFaction(id)];

    // console.info(`factionFavours: ${factionFavours}`);

    const data = {
      ...rawData,
      // Show 'X Favours' as the quantity
      level: factionFavours,
      textualLevel: `${factionFavours} Favour${factionFavours === 1 ? '' : 's'}`,
    };

    if (!this.isUsable()) {
      const failureExplanation = this.makeFailureExplanation();
      return (
        <DummiedItem
          data={{
            ...data,
            secondaryDescription: `${data.secondaryDescription ? data.secondaryDescription : ''}<p><i>${failureExplanation}</i></p>`,
          }}
          element={element}
        />
      );
    }

    return (
      <UsableItem data={{ ...data, level: factionFavours }} element={element} />
    );
  }
}

FactionItem.propTypes = {
  attributes: PropTypes.object.isRequired, // eslint-disable-line
  data: PropTypes.object.isRequired, // eslint-disable-line
  element: PropTypes.element.isRequired,
  id: PropTypes.number.isRequired,
  myself: PropTypes.object.isRequired, // eslint-disable-line
  preferences: PropTypes.object.isRequired, // eslint-disable-line
};

function mapState({ attributes, myself, possessions, preferences }) {
  return { attributes, myself, possessions, preferences };
}

export default connect(mapState)(FactionItem);
