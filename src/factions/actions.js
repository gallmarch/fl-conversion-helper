import fetchAndParseConnectedQualities from './fetch-and-parse-connected-qualities';

const FAVOURS_AND_RENOWN = 'FAVOURS_AND_RENOWN';

// Retrieve the Favours and Renown qualities from the server,
// parse them, and dispatch an action
function fetchConnectedQualities() {
  return (dispatch) => {
    fetchAndParseConnectedQualities()
      .then(({ favours, renown }) => {
        dispatch({
          type: FAVOURS_AND_RENOWN,
          payload: { favours, renown },
        });
      });
  };
}

export {
  FAVOURS_AND_RENOWN,
  fetchConnectedQualities,
};
