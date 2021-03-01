import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToolTip from '../tooltips/ToolTip';
import { IMAGE_ROOT } from './Item';

export default class DummiedItem extends Component {
  constructor(props) {
    super(props);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { showToolTip: false };
  }

  handleMouseLeave() {
    this.setState({ showToolTip: false });
  }

  handleMouseMove() {
    this.setState({ showToolTip: true });
  }

  render() {
    const { data } = this.props;
    const { showToolTip } = this.state;

    const {
      name,
      image,
      level,
    } = data;

    return (
      <li className="item">
        <div className="icon icon--inventory icon--flch-dummied">
          <img
            alt={name}
            onMouseLeave={this.handleMouseLeave}
            onMouseMove={this.handleMouseMove}
            ref={(element) => { this.element = element; }}
            src={`${IMAGE_ROOT}/${image}small.png`}
          />
          <span className="js-item-value icon__value">{level}</span>
        </div>
        {showToolTip && (<ToolTip data={data} parent={this.element} active={showToolTip} />)}
      </li>
    );
  }
}

DummiedItem.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line
};
