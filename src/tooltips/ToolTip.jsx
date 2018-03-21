import React, { Component } from 'react';
import BaseToolTip from 'react-portal-tooltip';

const IMAGE_ROOT = '//images.fallenlondon.com/images/icons_small';

export default function ToolTip({
  active,
  data,
  parent,
}) {
  const { Description, Image, Level, Name, SecondaryDescription, TextualLevel } = data;
  return (
    <BaseToolTip
      active={active}
      position="bottom"
      parent={parent}
      style={{ style: { transition: '0s all !important' } , arrowStyle: {} }}
      tooltipTimeout={100}
    >
      <div className="tooltip">
        <div className="icon icon--circular">
          <img src={`${IMAGE_ROOT}/${Image}.png`} />
        </div>
        <div className="tooltip__desc">
          <span className="item__name">{Name}</span>
          {' '}
          <span className="item__value">{TextualLevel === undefined ? Level : TextualLevel}</span>
          <p dangerouslySetInnerHTML={{ __html: Description }} />
          <i dangerouslySetInnerHTML={{ __html: SecondaryDescription }} />
        </div>
      </div>
    </BaseToolTip>
  );
}
