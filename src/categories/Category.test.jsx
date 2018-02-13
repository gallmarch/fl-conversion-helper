import React from 'react';
import renderer from 'react-test-renderer';

import { Category, mapStateToProps, toggleState } from './Category';

describe('Category', () => {
  it('matches its snapshot', () => {
    const category = 'category-id';
    const categoryName = 'category-name';
    const children = <li />;
    const preferences = { expansions: { [category]: true } };
    const component = renderer.create(<Category
      category={category}
      categoryName={categoryName}
      preferences={preferences}
    >
      {children}
    </Category>);

    expect(component).toMatchSnapshot();
  });

  describe('#toggleState', () => {
    const category = 'category-id';
    it('flips true to false', () => {
      const initialValue = true;
      const props = {
        category,
        preferences: { expansions: { [category]: initialValue } },
        setCategoryExpansion: jest.fn(),
      };
      toggleState(props);
      expect(props.setCategoryExpansion).toHaveBeenCalledWith({ category, expanded: false });
    });

    it('flips true to false', () => {
      const initialValue = false;
      const props = {
        category,
        preferences: { expansions: { [category]: initialValue } },
        setCategoryExpansion: jest.fn(),
      };
      toggleState(props);
      expect(props.setCategoryExpansion).toHaveBeenCalledWith({ category, expanded: true });
    });
  });

  describe('#mapStateToProps', () => {
    it('returns the preferences property', () => {
      const preferences = { key: 'expected-value' };
      expect(mapStateToProps({ preferences })).toEqual({ preferences });
    });
  });
});
