import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Category from './categories/Category';
import Item from './items/Item';
import FactionItemContainer from './items/FactionItemContainer';
import { tier1, tier2, tier3, tier4, factionItems, fidgetingWriter } from './items';
import { fetchConnectedQualities } from './factions/actions';

class Extension extends Component {
  componentDidMount() {
    // Only fetch the Renown/Favours qualities when the component mounts;
    // the Extension mounts when the 'Myself' tab loads, and it's not
    // possible to change Renown/Favours directly from this tab, so
    // the qualities are static throughout the component's lifetime.
    this.props.fetchConnectedQualities();
  }

  render() {
    const { preferences: { enablements, visibilities } } = this.props;

    if (!visibilities) {
      return <div>Loading...</div>;
    }

    // Show each category if the user's preference is that we do so.
    // In theory we could shoehorn this into a single map, but it's
    // probably better to be explicit here.
    return (
      <div>
        {visibilities.tier1 && (
          <Category category="tier1" categoryName="Tier 1">
            {tier1.map(id => <Item key={id} id={id} enablementPreference={enablements.tiers} />)}
          </Category>
        )}

        {visibilities.tier2 && (
          <Category category="tier2" categoryName="Tier 2">
            {tier2.map(id => <Item key={id} id={id} enablementPreference={enablements.tiers} />)}
          </Category>
        )}

        {visibilities.tier3 && (
          <Category category="tier3" categoryName="Tier 3">
            {tier3.map(id => <Item key={id} id={id} enablementPreference={enablements.tiers} />)}
          </Category>
        )}

        {visibilities.tier4 && (
          <Category category="tier4" categoryName="Tier 4">
            {tier4.map(id => <Item key={id} id={id} enablementPreference={enablements.tiers} />)}
          </Category>
        )}

        {visibilities.faction && (
          <Category category="factionItems" categoryName="Faction items">
            {factionItems.map(id => (
              <FactionItemContainer key={id} id={id} enablementPreference={enablements.factions} />
            ))}
          </Category>
        )}

        {visibilities.fidgetingWriter && (
          <Category category="fidgetingWriter" categoryName="Fidgeting Writer">
            {fidgetingWriter.map(id => <Item key={id} id={id} alwaysConvertible />)}
          </Category>
        )}
      </div>
    );
  }
}

Extension.propTypes = {
  fetchConnectedQualities: PropTypes.func.isRequired,
  preferences: PropTypes.shape({
    extensions: PropTypes.object,
    visibilities: PropTypes.object,
  }).isRequired,
};

function mapStateToProps(state) {
  return { preferences: state.preferences };
}

export default connect(mapStateToProps, { fetchConnectedQualities })(Extension);
