import fetchAndParseConnectedQualities from './fetch-and-parse-connected-qualities';

const preferences = {
  CATEGORY_EXPANSION: 'preferences/category-expansion',
};

const FAVOURS_AND_RENOWN = 'FAVOURS_AND_RENOWN';

function setExpanded({ category, expanded }) {
  return (dispatch) => {
    dispatch({ type: preferences.CATEGORY_EXPANSION, payload: { category, expanded } });
  };
}

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
  preferences,
  setExpanded,
  fetchConnectedQualities,
};
