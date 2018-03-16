import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToolTip from '../tooltips/ToolTip';

import { useQuality } from './actions';

const IMAGE_ROOT = '//images.fallenlondon.com/images/icons_small';

class Item extends Component {

  constructor(props) {
    super(props);
    this.findMatch = this.findMatch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { showToolTip: false };
  }

  findMatch() {
    // Delegate the onclick behaviour to the real item (which is wired up to the React app)
    const { id, possessions } = this.props;
    const match = possessions.find(el => el.Id === Number(id));
    if (!match) {
      return null;
    }
    const { Name: name } = match;
    const selector = `.stack-content > div:not(.flch-content-container) img[alt="${name}"]`;
    return {
      data: match,
      element: document.querySelector(selector),
    };
  }

  handleClick() {
    this.findMatch().element.click();
    // TODO: We probably only want to hide the tooltip if we are successfully using the item
    this.setState({ showToolTip: false });
  }

  handleMouseEnter() {
    console.info(this.findMatch().data);
  }

  handleMouseLeave() {
    this.setState({ showToolTip: false });
  }

  handleMouseMove() {
    this.setState({ showToolTip: true });
  }

  render() {
    // const { id, possessions } = this.props;I
    const { element, showToolTip } = this.state;
    // const match = possessions.find(el => el.Id === Number(id));
    const match = this.findMatch();

    if (match) {
      const { data } = match;
      return (
        <li className="item items--emphasise">
          <div className="icon icon--inventory icon--emphasize">
            <img
              onClick={this.handleClick}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              onMouseMove={this.handleMouseMove}
              ref={(element) => this.element = element}
              src={`${IMAGE_ROOT}/${data.Image}.png`}
            />
            <span className="js-item-value icon__value">{data.Level}</span>
          </div>
          {showToolTip && (<ToolTip data={data} parent={this.element} active={showToolTip} />)}
        </li>
      );
    }

    return (
      <li className="item items--emphasize">
        <div style={{ height: '40px', width: '40px', backgroundColor: 'rgba(0, 0, 0, 0.15)', filter: 'blur(2px)' }} />
      </li>
    );
  }
}

function mapState({ possessions }) {
  return { possessions: possessions.possessions };
}

export default connect(mapState, { useQuality })(Item);
