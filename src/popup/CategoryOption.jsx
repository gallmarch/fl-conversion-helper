import React, { Component } from 'react';

export default class CategoryOption extends Component {
  render() {
    console.info('option props');
    console.info(this.props);
    const { category: { title } } = this.props;
    return (
      <label className="flch-popup__option">
        <input type="checkbox" />
        {title}
      </label>
    );
  }
}
