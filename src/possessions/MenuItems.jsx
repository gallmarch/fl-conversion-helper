import React, { Fragment } from 'react';
import { connect } from 'react-redux';

function MenuItems(props) {
  const { preferences: { visibilities } } = props;
  return (
    <Fragment>
      {visibilities.tier1 && (<li className="nav__item nav__item--flch">
        <a>Tier 1</a>
      </li>)}
      {visibilities.tier2 && (<li className="nav__item nav__item--flch">
        <a>Tier 2</a>
      </li>)}
      {visibilities.tier3 && (<li className="nav__item nav__item--flch">
        <a>Tier 3</a>
      </li>)}
      {visibilities.tier4 && (<li className="nav__item nav__item--flch">
        <a>Tier 4</a>
      </li>)}
      {visibilities.faction && (<li className="nav__item nav__item--flch">
        <a>Faction Items</a>
      </li>)}
      {visibilities.fidgetingWriter && (<li className="nav__item nav__item--flch">
        <a>Fidgeting Writer</a>
      </li>)}
    </Fragment>
  );
}

function mapState({ preferences }) {
  return { preferences };
}

export default connect(mapState)(MenuItems);
