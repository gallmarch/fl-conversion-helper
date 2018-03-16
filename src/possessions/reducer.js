import { FETCHING_POSSESSIONS, POSSESSIONS_FETCHED } from './types';

const INITIAL_STATE = {
  isFetching: false,
  possessions: [],
};

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case FETCHING_POSSESSIONS:
      return { ...state, isFetching: true };
    case POSSESSIONS_FETCHED:
      return { isFetching: false, possessions: action.payload };
    default:
      return state;
  }
}
