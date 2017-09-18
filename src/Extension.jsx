import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './categories/Category';
import Item from './items/Item';
import FactionItem from './items/FactionItem';
import { tier1, tier2, tier3, tier4, factionItems, fidgetingWriter } from './items';
import { fetchConnectedQualities } from './factions/actions';

class Extension extends Component {
  componentDidMount() {
    // Only fetch the Renown/Favours qualities when the component mounts
    this.props.fetchConnectedQualities();
  }

  render() {
    const { preferences: { visibilities } } = this.props;
    if (!visibilities) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {visibilities.tier1 && (
          <Category category="tier1" categoryName="Tier 1">
            {tier1.map((id) => <Item key={id} id={id} />)}
          </Category>
        )}

        {visibilities.tier2 && (
          <Category category="tier2" categoryName="Tier 2">
            {tier2.map((id) => <Item key={id} id={id} />)}
          </Category>
        )}

        {visibilities.tier3 && (
          <Category category="tier3" categoryName="Tier 3">
            {tier3.map((id) => <Item key={id} id={id} />)}
          </Category>
        )}

        {visibilities.tier4 && (
          <Category category="tier4" categoryName="Tier 4">
            {tier4.map((id) => <Item key={id} id={id} />)}
          </Category>
        )}

        {visibilities.faction && (
          <Category category="factionItems" categoryName="Faction items">
            {factionItems.map((id) => <FactionItem key={id} id={id} />)}
          </Category>
        )}

        {visibilities.fidgetingWriter && (
          <Category category="fidgetingWriter" categoryName="Fidgeting Writer">
            {fidgetingWriter.map((id) => <Item key={id} id={id} alwaysConvertible />)}
          </Category>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { preferences: state.preferences };
}

export default connect(mapStateToProps, { fetchConnectedQualities })(Extension);
