import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategoryVisibility } from '../preferences/actions';

class CategoryOption extends Component {
  constructor() {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(evt) {
    console.info('checkbox change detected');
    const { category: { key }, setCategory } = this.props;
    const visible = evt.target.checked;
    setCategoryVisibility({ visible, category: key });
  }

  render() {
    const { category: { key, title }, preferences } = this.props;
    return (
      <label className="flch-popup__option">
        <input type="checkbox" checked={preferences.visibilities[key]} onChange={this.handleCheckboxChange} />
        {title}
      </label>
    );
  }
}

export default connect(null, { setCategoryVisibility })(CategoryOption);
