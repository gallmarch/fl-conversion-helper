import React from 'react';
import { shallow } from 'enzyme';

import { CategoryContainer } from '../CategoryContainer';

describe('Category', () => {
  it('mounts without crashing', () => {
    const setCategoryExpansion = jest.fn();
    shallow(
      <CategoryContainer
        heading="Category Heading"
        name="categoryName"
        setCategoryExpansion={setCategoryExpansion}
        expanded
      >
        <div />
      </CategoryContainer>,
    );
  });
});
