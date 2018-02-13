import $ from 'jquery';

import * as factions from './index';
import { fetchConnectedQualities } from './actions';

import { mockConnections } from './__mocks__/mockResponses';

const factionKeys = [
  factions.BOHEMIANS,
  factions.CHURCH,
  factions.CONSTABLES,
  factions.CRIMINALS,
  factions.DOCKS,
  factions.GREAT_GAME,
  factions.HELL,
  factions.REVOLUTIONARIES,
  factions.RUBBERIES,
  factions.SOCIETY,
  factions.TOMB_COLONIES,
  factions.URCHINS,
];

describe('factions/actions', () => {
  describe('#fetchConnectedQualities', () => {
    it('returns a function', () => {
      expect(typeof fetchConnectedQualities()).toBe('function');
    });

    describe('returned function', () => {
      let dispatch;
      let f;

      beforeEach(() => {
        // Mock out the AJAX call
        jest.spyOn($, 'ajax').mockImplementation(() => new Promise((resolve) => {
          resolve(mockConnections());
        }));
        // Get something we can call directly
        f = fetchConnectedQualities();
        // Mock the dispatch function
        dispatch = jest.fn(({ payload }) => payload);
      });

      it('calls its param', (done) => {
        f(dispatch).then(() => {
          expect(dispatch).toHaveBeenCalled();
          done();
        });
      });

      it('returns the expected top-level keys', (done) => {
        f(dispatch).then((res) => {
          const expected = ['favours', 'renown'].sort();
          expect(Object.keys(res).sort()).toEqual(expected.sort());
          done();
        });
      });

      it('returns the expected renown keys', (done) => {
        f(dispatch).then((res) => {
          expect(Object.keys(res.renown).sort()).toEqual(factionKeys);
          done();
        });
      });

      it('returns the expected favours keys', (done) => {
        f(dispatch).then((res) => {
          expect(Object.keys(res.favours).sort()).toEqual(factionKeys);
          done();
        });
      });
    });
  });
});
