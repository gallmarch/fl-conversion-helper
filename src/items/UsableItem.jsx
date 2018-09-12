import React, { Component } from 'react';

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

    this.props.element.click();
  }

  handleMouseLeave() {
    this.setState({ showToolTip: false });
  }

  handleMouseMove() {
    this.setState({ showToolTip: true });
  }
  render() {
    const { data, element } = this.props;
    const { showToolTip } = this.state;

    return (
      <li className="item items--emphasise">
        <div className="icon icon--inventory icon--emphasize">
          <img
            alt={data.Name}
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onMouseMove={this.handleMouseMove}
            ref={(element) => this.element = element}
            src={`${IMAGE_ROOT}/${data.image}.png`}
          />
          <span className="js-item-value icon__value">{data.level}</span>
        </div>
        {showToolTip && (<ToolTip data={data} parent={this.element} active={showToolTip} />)}
      </li>
    );
  }
}
