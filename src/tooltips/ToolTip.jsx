import React, { Component } from 'react';
import BaseToolTip from 'react-portal-tooltip';

const IMAGE_ROOT = '//images.fallenlondon.com/images/icons_small';

export default function ToolTip({
  active,
  data,
  parent,
}) {
  const {
    description,
    image,
    level,
    name,
    secondaryDescription,
    textualLevel,
  } = data;
  return (
    <BaseToolTip
      active={active}
      position="bottom"
      parent={parent}
      style={{
        style: { transition: '0s all !important' },
        arrowStyle: {},
      }}
      tooltipTimeout={100}
    >
      <div className="tooltip">
        <div className="icon tooltip__icon">
          <img src={`${IMAGE_ROOT}/${image}.png`} />
        </div>
        <div className="tooltip__desc">
          <span className="item__name">{name}</span>
          {' '}
          <span className="item__value">{textualLevel === undefined ? level : textualLevel}</span>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          <i dangerouslySetInnerHTML={{ __html: secondaryDescription }} />
        </div>
      </div>
    </BaseToolTip>
  );
}
