import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMyself } from '../myself/actions';
import * as items from '../items/constants';
import Item from '../items/Item';
import getVisibleItems from '../shared/getVisibleItems';
import UsabilityContext from '../shared/UsabilityContext';
import Category from './Category';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.isWaitingForData = this.isWaitingForData.bind(this);
  }
  componentDidMount() {
    this.props.fetchMyself();
  }

  isWaitingForData() {
    const { attributes, favours } = this.props;
    const noAttributes = Object.keys(attributes).every(name => attributes[name] === undefined);
    const favoursAreEmpty = !Object.keys(favours).length;
    return noAttributes || favoursAreEmpty;
  }

  render() {
    const {
      filterString,
      visibleItems,
      preferences: { enablements, expansions, visibilities },
    } = this.props;

    // If we're waiting for attributes to be read, then return null
    if (this.isWaitingForData()) {
      return null;
    }

    const isVisible = id => (!filterString.length) || visibleItems[id];
    const itemsAreUsable = !document.querySelector('.possessions__categories > .inventory-group-container .items--blocked');

    return (
      <UsabilityContext.Provider value={itemsAreUsable}>
        <Fragment>
          {visibilities.tier1 && (
            <Category
              heading="Tier 1"
              expanded={expansions.tier1}
              name="tier1"
            >
              {items.tier1.filter(isVisible).map(id => (
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
              {items.tier2.filter(isVisible).map(id => (
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
              {items.tier3.filter(isVisible).map(id => (
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
              {items.tier4.filter(isVisible).map(id => (
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
              {items.factionItems.filter(isVisible).map(id => (
                <Item
                  key={id}
                  id={Number(id)}
                  enablementPreference={enablements.factions}
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
              {items.fidgetingWriter.filter(isVisible).map(id => (
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
      </UsabilityContext.Provider>
    );
  }
}

Categories.propTypes = {
  favours: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchMyself: PropTypes.func.isRequired,
  filterString: PropTypes.string.isRequired,
  preferences: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  visibleItems: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  attributes: PropTypes.shape({
    Watchful: PropTypes.number,
  }),
};

Categories.defaultProps = {
  attributes: {
    Watchful: undefined,
  },
};

const mapStateToProps = state => ({
  attributes: state.attributes,
  favours: state.myself.favours,
  filterString: state.possessions.filterString,
  preferences: state.preferences,
  visibleItems: getVisibleItems(state),
});

export default connect(mapStateToProps, { fetchMyself })(Categories);
