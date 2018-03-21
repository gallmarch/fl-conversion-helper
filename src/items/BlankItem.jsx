import React from 'react';
import PropTypes from 'prop-types';

export default function BlankItem() {
  return (
    <li className="item items--emphasize">
      <div style={{ height: '40px', width: '40px', backgroundColor: 'rgba(0, 0, 0, 0.15)', filter: 'blur(2px)' }} />
    </li>
  );
}
