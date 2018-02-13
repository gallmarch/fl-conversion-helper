import React from 'react';
import renderer from 'react-test-renderer';

import { FACTIONS } from '../preferences/constants';

import {
  isConvertible,
  FactionItem,
} from './FactionItem';

describe('FactionItem', () => {
  describe('when the user has no matching item', () => {
    it('matches its snapshot', () => {
      const props = {
        attributes: { key: 0 },
        enablementPreference: 0,
        factions: { favours: {}, renown: {} },
        id: 'some-component-id',
      };
      const component = renderer.create(<FactionItem {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});

describe('isConvertible', () => {
  it('returns true if it should always be convertible', () => {
    expect(isConvertible({ enablementPreference: FACTIONS.ALWAYS })).toBe(true);
  });
});
