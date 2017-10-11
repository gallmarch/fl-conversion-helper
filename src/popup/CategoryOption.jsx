import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCategoryVisibility } from './actions';

// A CategoryOption is just a checkbox, a label, and a click handler.
class CategoryOption extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  // When the checkbox value changes, set the stored preference
  // accordingly
  handleCheckboxChange(evt) {
    const { category: { key } } = this.props;
    const visible = evt.target.checked;
    this.props.setCategoryVisibility({ visible, category: key });
  }

  // NOTE: the Boolean coercion of the visibility preference is a
  // workaround so that React knows that the component is controlled
  // throughout its lifetime. (Leaving the value uncoerced causes
  // React to emit a warning, but doesn't affect the component's
  // functionality.)
  render() {
    const { category: { key, title }, preferences } = this.props;
    return (
      <label className="flch-popup__option" htmlFor={key}>
        <input
          type="checkbox"
          id={key}
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
