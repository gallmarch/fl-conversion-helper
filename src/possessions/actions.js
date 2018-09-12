import axios from 'axios';

import { FETCHING_POSSESSIONS, POSSESSIONS_FETCHED } from './types';

export function fetchPossessions() {
  return (dispatch) => {
    dispatch({ type: FETCHING_POSSESSIONS });
    return axios.get('https://api.fallenlondon.com/api/character/possessions')
      .then(({ data }) => {
        /*
        const { Possessions } = data;
        // Flatten and discard
        const possessions = Possessions.reduce((acc, el) => [ ...acc, ...el.Possessions ], []);
        */
        const possessions = data.possessions.reduce((acc, el) => [...acc, ...el.possessions], []);

        console.info('possessions are');
        console.info(possessions);

        dispatch({ type: POSSESSIONS_FETCHED, payload: possessions });
      });
  };
}
