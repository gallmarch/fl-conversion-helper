import React from 'react';
import PropTypes from 'prop-types';

export default function BlankItem({ data }) {
  return (
    <li className="item items--emphasize">
      <div
        style={{ display: 'block', height: '40px', width: '40px', backgroundColor: 'rgba(0, 0, 0, 0.15)', filter: 'blur(2px)' }}
      >
        <img alt="­" style={{ display: 'none' }}/>
      </div>
    </li>
  );
}
