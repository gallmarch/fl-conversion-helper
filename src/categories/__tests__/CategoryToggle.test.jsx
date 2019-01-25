import React from 'react';
import { shallow } from 'enzyme';

import { CategoryToggle } from '../CategoryToggle';

describe('CategoryToggle', () => {
  it('mounts without crashing', () => {
    const onClick = jest.fn();
    shallow(<CategoryToggle onClick={onClick} />);
  });
});
