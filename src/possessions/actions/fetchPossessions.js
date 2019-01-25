import axios from 'axios';

import { FETCHING_POSSESSIONS, POSSESSIONS_FETCHED } from '../types';
import { API_URL_BASE } from '../../constants';

export default function fetchPossessions() {
  return (dispatch) => {
    dispatch({ type: FETCHING_POSSESSIONS });
    return axios.get(`${API_URL_BASE}/api/character/myself`)
      .then(({ data }) => {
        const possessions = data.possessions.reduce((acc, el) => [...acc, ...el.possessions], []);

        dispatch({ type: POSSESSIONS_FETCHED, payload: possessions });
      });
  };
}
