import {
  FETCHING_POSSESSIONS,
  FILTER_STRING_CHANGED,
  POSSESSIONS_FETCHED,
} from './types';

const INITIAL_STATE = {
  filterString: '',
  isFetching: false,
  possessions: [],
};

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case FETCHING_POSSESSIONS:
      return { ...state, isFetching: true };
    case FILTER_STRING_CHANGED:
      console.info('FILTER_STRING_CHANGED');
      return { ...state, filterString: action.payload };
    case POSSESSIONS_FETCHED:
      return { ...state, isFetching: false, possessions: action.payload };
    default:
      return state;
  }
}
