import React from 'react';

export default function Category(props) {
  return (
    <div>
      <div>
        <h3 className="heading heading--3">{props.heading}</h3>
        <div className="row">
          <ul className="items items--inline inventory-group__items">
            {props.children}
          </ul>
        </div>
        <hr />
      </div>
    </div>
  );
}
