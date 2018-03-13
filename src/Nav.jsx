import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { log } from './util';

function NavItem({ onClick, text }) {
  return (<li className="nav__item">
    <a onClick={onClick}>
      {text}
    </a>
  </li>);
}

function Nav({ preferences }) {
  const { enablements, visibilities } = preferences;

  return (
    <Fragment>
      {visibilities.tier1 && <NavItem text="Tier 1" />}
      {visibilities.tier2 && <NavItem text="Tier 2" />}
      {visibilities.tier3 && <NavItem text="Tier 3" />}
      {visibilities.tier4 && <NavItem text="Tier 4" />}
      {visibilities.faction && <NavItem text="Faction items" />}
      {visibilities.fidgetingWriter && <NavItem text="Fidgeting Writer" />}
    </Fragment>
  );
}

function mapStateToProps({ preferences }) {
  return { preferences };
}

export default connect(mapStateToProps)(Nav);
