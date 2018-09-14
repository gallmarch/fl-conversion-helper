import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BlankItem from './BlankItem';

function MissingItem(props) {
  const { filterString } = props;
  if (filterString.length) {
    return null;
  }
  return <BlankItem />;
}

MissingItem.propTypes = {
  filterString: PropTypes.string.isRequired,
};

const mapStateToProps = ({ possessions: { filterString } }) => ({ filterString });

export default connect(mapStateToProps)(MissingItem);
