import { MYSELF_RECEIVED } from './types';

const INITIAL_STATE = {
  renown: {},
  favours: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case MYSELF_RECEIVED:
      return { ...payload };
    default:
      return state;
  }
}
