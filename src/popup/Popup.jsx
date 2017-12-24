import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FACTIONS, TIERS } from '../preferences/constants';
import CategoryOption from './CategoryOption';
import { setEnablementPreference } from './actions';
import categories from './categories';

// The Popup component displays the current state of our display
// preferences and updates the preference storage when we make
// changes. The content script is listening for storage changes, so
// we don't need to construct any sort of link between popup and
// content script.
function Popup(props) {
  const categoryKeys = ['tier1', 'tier2', 'tier3', 'tier4', 'faction', 'fidgetingWriter'];
  const { handleEnablementPreferenceChange, preferences } = props;

  // Wait for preferences to be loaded
  if (!preferences) {
    return null;
  }

  console.info('preferences');
  console.info(preferences);

  return (
    <div>
      <h1 className="flch-popup__header">Show categories</h1>
      {categoryKeys.map(key => (
        <CategoryOption key={key} category={categories[key]} preferences={preferences} />
      ))}
      <h2 className="flch-popup__header">Options</h2>
      <div>
        <p>Enable tier items</p>
        <div className="flch-popup__radio-group">
          <label className="flch-popup__radio-option">
            <input
              checked={preferences.enablements.tiers === TIERS.MASS}
              name="tiers"
              onChange={handleEnablementPreferenceChange}
              type="radio"
              value={TIERS.MASS}
            />
            For mass conversions
          </label>
          <label className="flch-popup__radio-option">
            <input
              checked={preferences.enablements.tiers === TIERS.SMALL}
              name="tiers"
              onChange={handleEnablementPreferenceChange}
              type="radio"
              value={TIERS.SMALL}
            />
            For small conversions
          </label>
          <label className="flch-popup__radio-option">
            <input
              checked={preferences.enablements.tiers === TIERS.ALWAYS}
              name="tiers"
              onChange={handleEnablementPreferenceChange}
              type="radio"
              value={TIERS.ALWAYS}
            />
            Always
          </label>
        </div>
      </div>
      <div>
        <p>Enable faction items</p>
        <div className="flch-popup__radio-group">
          <label className="flch-popup__radio-option">
            <input
              checked={preferences.enablements.factions === FACTIONS.RENOWN}
              name="factions"
              onChange={handleEnablementPreferenceChange}
              type="radio"
              value={FACTIONS.RENOWN}
            />
            For renown conversions
          </label>
          <label className="flch-popup__radio-option">
            <input
              checked={preferences.enablements.factions === FACTIONS.ALWAYS}
              name="factions"
              onChange={handleEnablementPreferenceChange}
              type="radio"
              value={FACTIONS.ALWAYS}
            />
            Always
          </label>
        </div>
      </div>
    </div>
  );
}

class PopupContainer extends Component {
  constructor(...args) {
    super(...args);
    this.handleEnablementPreferenceChange = this.handleEnablementPreferenceChange.bind(this);
  }

  handleEnablementPreferenceChange(evt) {
    const { name, value } = evt.target;
    console.info({ name, value });
    this.props.setEnablementPreference({ name, value: Number(value) });
  }

  render() {
    return <Popup {...this.props} handleEnablementPreferenceChange={this.handleEnablementPreferenceChange} />
  }
}

PopupContainer.propTypes = {
  preferences: PropTypes.shape({
    expansions: PropTypes.object,
    visibilities: PropTypes.object,
  }),
};
PopupContainer.defaultProps = {
  preferences: {
    expansions: {},
    visibilities: {},
    enablements: {},
  },
};

function mapStateToProps(state) {
  return { ...state.preferences };
}

export default connect(mapStateToProps, { setEnablementPreference })(PopupContainer);
