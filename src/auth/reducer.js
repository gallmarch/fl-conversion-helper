import { LOGGED_IN, LOGGED_OUT } from './types';

const INITIAL_STATE = { authenticated: false };

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case LOGGED_IN:
      return { authenticated: true };
    case LOGGED_OUT:
      return { authenticated: false };
    default:
      return state;
  }
}
