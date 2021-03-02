import React from 'react';
import PropTypes from 'prop-types';
import BaseToolTip from 'react-portal-tooltip';

const IMAGE_ROOT = '//images.fallenlondon.com/icons';

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
          <img
            alt={name}
            src={`${IMAGE_ROOT}/${image}small.png`}
          />
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

ToolTip.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  parent: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

ToolTip.defaultProps = {
  active: false,
};
