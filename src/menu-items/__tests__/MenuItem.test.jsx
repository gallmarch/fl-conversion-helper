import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('mounts without crashing', () => {
    const name = 'Category name';
    const visibleItems = {};
    shallow(<MenuItem name={name} items={[]} visibleItems={visibleItems} />);
  });
});
