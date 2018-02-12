import React from 'react';
import renderer from 'react-test-renderer';

import CategoryToggle from './CategoryToggle';

describe('CategoryToggle', () => {
  it('matches its snapshot', () => {
    const componentTrue = renderer.create(<CategoryToggle state={true} />);
    expect(componentTrue).toMatchSnapshot();

    const componentFalse = renderer.create(<CategoryToggle state={false} />);
    expect(componentFalse).toMatchSnapshot();

    const componentUndefined = renderer.create(<CategoryToggle />);
    expect(componentUndefined).toMatchSnapshot();
  });
});
