import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToolTip from '../tooltips/ToolTip';
import { IMAGE_ROOT } from './Item';

export default class UsableItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { showToolTip: false };
  }

  handleClick() {
    const { element } = this.props;
    // TODO: We probably only want to hide the tooltip if we are successfully using the item
    this.setState({ showToolTip: false });

    element.click();
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

    return (
      <li className="item items--emphasise">
        <div className="icon icon--inventory icon--emphasize">
          <a
            role="button"
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onMouseMove={this.handleMouseMove}
            ref={(element) => { this.element = element; }}
            tabIndex="-1"
          >
            <img
              alt={data.Name}
              src={`${IMAGE_ROOT}/${data.image}.png`}
            />
          </a>
          <span className="js-item-value icon__value">{data.level}</span>
        </div>
        {showToolTip && (<ToolTip data={data} parent={this.element} active={showToolTip} />)}
      </li>
    );
  }
}

UsableItem.propTypes = {
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  element: PropTypes.node,
};

UsableItem.defaultProps = {
  data: {},
  element: null,
};
