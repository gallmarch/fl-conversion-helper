import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCategoryVisibility } from './actions';

class CategoryOption extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(evt) {
    const { category: { key } } = this.props;
    const visible = evt.target.checked;
    this.props.setCategoryVisibility({ visible, category: key });
  }

  render() {
    const { category: { key, title }, preferences } = this.props;
    return (
      <label className="flch-popup__option" htmlFor={key}>
        <input
          type="checkbox"
          name={key}
          checked={!!preferences.visibilities[key]}
          onChange={this.handleCheckboxChange}
        />
        {title}
      </label>
    );
  }
}

CategoryOption.propTypes = {
  category: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,

  preferences: PropTypes.shape({
    expansions: PropTypes.object,
    visibilities: PropTypes.object,
  }).isRequired,

  setCategoryVisibility: PropTypes.func.isRequired,
};

export default connect(null, { setCategoryVisibility })(CategoryOption);
