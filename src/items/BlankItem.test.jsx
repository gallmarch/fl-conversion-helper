import React from 'react';
import renderer from 'react-test-renderer';

import BlankItem from './BlankItem';

describe('BlankItem', () => {
  it('matches its snapshot', () => {
    const component = renderer.create(<BlankItem id="expected-id" />);
    expect(component).toMatchSnapshot();
  });
});
