import React from 'react';
import { mount, shallow } from 'enzyme';
import { MenuItem } from '../MenuItem';
import scrollToComponentByName from '../scrollToComponentByName';

jest.mock('../scrollToComponentByName');

describe('MenuItem', () => {
  it('mounts without crashing', () => {
    const name = 'Category name';
    const visibleItems = {};
    shallow(<MenuItem name={name} items={[]} visibleItems={visibleItems} />);
  });

  it('scrolls when clicked', () => {
    const name = 'Category name';
    const items = [1];
    const visibleItems = { 1: true };
    const wrapper = mount(<MenuItem name={name} items={items} visibleItems={visibleItems} />);
    wrapper.find('button').simulate('click');
    expect(scrollToComponentByName).toHaveBeenCalled();
  });
});
