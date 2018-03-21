import axios from 'axios';
import { log } from '../util';
import renownIDs from '../factions/renown';
import favourIDs from '../factions/favours';
import { MYSELF_RECEIVED } from './types';

export function fetchConnectedQualities() {
  return (dispatch) => {
    const url = 'https://api.fallenlondon.com/api/character/myself';
    return axios.get(url)
      .then(({ data }) => {
        // Destructure the incoming JSON
        const { Possessions } = data;
        const social = Possessions.find(el => el.Name === 'Social: Contacts & Acquaintances').Possessions;
        // Build the Renown and Favours object
        const payload = { renown: reduce(renownIDs), favours: reduce(favourIDs) };
        // Dispatch the action
        dispatch({ type: MYSELF_RECEIVED, payload });

        function reduce(obj) {
          return Object.keys(obj).reduce((acc, k) => {
            const match = social.find(el => el.Id === Number(obj[k]));
            return { ...acc, [k]: match ? match.Level : 0 };
          }, {});
        }
      });
  }
}
