import React, { Component } from 'react';
import BaseToolTip from 'react-portal-tooltip';

const IMAGE_ROOT = '//images.fallenlondon.com/images/icons_small';

export default function ToolTip({
  active,
  data,
  parent,
}) {
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
          <img src={`${IMAGE_ROOT}/${data.Image}.png`} />
        </div>
        <div className="tooltip__desc">
          <span className="item__name">{data.Name}</span> <span className="item__value">{data.Level}</span>
          <p dangerouslySetInnerHTML={{ __html: data.Description }} />
          <i dangerouslySetInnerHTML={{ __html: data.SecondaryDescription }} />
        </div>
      </div>
    </BaseToolTip>
  );
}
