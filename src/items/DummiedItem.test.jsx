import React from 'react';
import renderer from 'react-test-renderer';

import DummiedItem from './DummiedItem';

describe('DummiedItem', () => {
  it('matches its snapshot', () => {
    const inventoryMatch = createMockInventoryMatch();
    const id = 'expected-id';
    const quantity = 5;
    const props = { id, inventoryMatch, quantity };

    const component = renderer.create(<DummiedItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});

function createMockInventoryMatch() {
  const container = document.createElement('div');
  const img = document.createElement('img');
  img.setAttribute('src', '//example.com/image.png');
  img.setAttribute('alt', 'some alt text');
  container.appendChild(img);
  return container;
}
