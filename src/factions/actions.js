/* eslint-disable import/prefer-default-export */
import baseFetchConnectedQualities from './fetchConnectedQualities';
import parseConnectedQualities from './parseConnectedQualities';

export const FAVOURS_AND_RENOWN = 'FAVOURS_AND_RENOWN';

// Retrieve the Favours and Renown qualities from the server,
// parse them, and dispatch an action
function fetchConnectedQualities(isLegacy) {
  return dispatch => baseFetchConnectedQualities(isLegacy)
    .then(response => parseConnectedQualities(response))
    .then(({ favours, renown }) =>
      // console.info('favours are');
      // console.info(favours);
      dispatch({ type: FAVOURS_AND_RENOWN, payload: { favours, renown } }),
    );
}

export { fetchConnectedQualities };
