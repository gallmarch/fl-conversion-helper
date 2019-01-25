import React from 'react';
import { shallow } from 'enzyme';

import { Categories } from '../Categories';

describe('Categories', () => {
  it('fetches character data on mount', () => {
    const fetchMyself = jest.fn();
    shallow(
      <Categories
        favours={{}}
        filterString=""
        attributes={{}}
        preferences={{}}
        fetchMyself={fetchMyself}
        visibleItems={{}}
      />,
    );
    expect(fetchMyself).toHaveBeenCalled();
  });
});
