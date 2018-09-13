/* eslint-disable import/prefer-default-export */
import baseFetchConnectedQualities from './fetchConnectedQualities';
import parseConnectedQualities from './parseConnectedQualities';

export const FAVOURS_AND_RENOWN = 'FAVOURS_AND_RENOWN';

// Retrieve the Favours and Renown qualities from the server,
// parse them, and dispatch an action
function fetchConnectedQualities() {
  return async (dispatch) => {
    console.info('fetcha fetcha');
    const response = await dispatch(baseFetchConnectedQualities());
    const { favours, renown } = parseConnectedQualities(response);
    return dispatch({ type: FAVOURS_AND_RENOWN, payload: { favours, renown } });
  };
  /*
  return dispatch => baseFetchConnectedQualities()
    .then(response => parseConnectedQualities(response))
    .then(({ favours, renown }) => dispatch({
      type: FAVOURS_AND_RENOWN,
      payload: { favours, renown },
    }));
    */
}

export { fetchConnectedQualities };
