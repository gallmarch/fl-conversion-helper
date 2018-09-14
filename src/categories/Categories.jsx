import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPossessions } from '../possessions/actions';
import { fetchConnectedQualities } from '../myself/actions';
import * as items from '../items/constants';
import Item from '../items/Item';
import Category from './Category';

class Categories extends Component {
  componentDidMount() {
    this.props.fetchPossessions();
    this.props.fetchConnectedQualities();
  }

  render() {
    const { preferences: { enablements, expansions, visibilities } } = this.props;
    return (
      <Fragment>
        {visibilities.tier1 && (
          <Category
            heading="Tier 1"
            expanded={expansions.tier1}
            name="tier1"
          >
            {items.tier1.map(id => (
              <Item
                key={id}
                id={Number(id)}
                enablementPreference={enablements.tiers}
              />
            ))}
          </Category>
        )}
        {visibilities.tier2 && (
          <Category
            expanded={expansions.tier2}
            heading="Tier 2"
            name="tier2"
          >
            {items.tier2.map(id => (
              <Item
                key={id}
                id={Number(id)}
                enablementPreference={enablements.tiers}
              />
            ))}
          </Category>
        )}
        {visibilities.tier3 && (
          <Category
            expanded={expansions.tier3}
            heading="Tier 3"
            name="tier3"
          >
            {items.tier3.map(id => (
              <Item
                key={id}
                id={Number(id)}
                enablementPreference={enablements.tiers}
              />
            ))}
          </Category>
        )}
        {visibilities.tier4 && (
          <Category
            expanded={expansions.tier4}
            name="tier4"
            heading="Tier 4"
          >
            {items.tier4.map(id => (
              <Item
                key={id}
                id={Number(id)}
                enablementPreference={enablements.tiers}
              />
            ))}
          </Category>
        )}
        {visibilities.faction && (
          <Category
            expanded={expansions.faction}
            name="faction"
            heading="Faction Items"
          >
            {items.factionItems.map(id => (
              <Item
                key={id}
                id={Number(id)}
                enablementPreference={enablements.tiers}
              />
            ))}
          </Category>
        )}
        {visibilities.fidgetingWriter && (
          <Category
            expanded={expansions.fidgetingWriter}
            name="fidgetingWriter"
            heading="Fidgeting Writer"
          >
            {items.fidgetingWriter.map(id => (
              <Item
                key={id}
                id={Number(id)}
                enablementPreference={enablements.tiers}
                alwaysConvertible
              />
            ))}
          </Category>
        )}
      </Fragment>
    );
  }
}

Categories.propTypes = {
  fetchConnectedQualities: PropTypes.func.isRequired,
  fetchPossessions: PropTypes.func.isRequired,
  preferences: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapState({ possessions, preferences }) {
  return { possessions, preferences };
}

export default connect(mapState, { fetchPossessions, fetchConnectedQualities })(Categories);
