/* eslint-disable import/prefer-default-export */
import baseFetchConnectedQualities from './fetchConnectedQualities';
import parseConnectedQualities from './parseConnectedQualities';

export const FAVOURS_AND_RENOWN = 'FAVOURS_AND_RENOWN';

// Retrieve the Favours and Renown qualities from the server,
// parse them, and dispatch an action
function fetchConnectedQualities() {
  return (dispatch) => {
    return baseFetchConnectedQualities()
      .then(parseConnectedQualities)
      .then(({ favours, renown }) => {
        // console.info('favours are');
        // console.info(favours);
        return dispatch({ type: FAVOURS_AND_RENOWN, payload: { favours, renown } });
      });
  };
}

export { fetchConnectedQualities };
