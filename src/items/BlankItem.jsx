import React from 'react';
import PropTypes from 'prop-types';

export default function BlankItem(props) {
  return <li id={props.id} className="empty-icon flch-empty-icon" />;
}

BlankItem.propTypes = {
  id: PropTypes.string,
};

BlankItem.defaultProps = {
  id: undefined,
};
