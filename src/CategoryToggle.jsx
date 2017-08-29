import React from 'react';

export default function CategoryToggle(props) {
  if (props.state) {
    return <span className="contract">-</span>;
  }
  return <span className="expand">+</span>;
}
