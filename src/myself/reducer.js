import { MYSELF_RECEIVED } from './types';

const INITIAL_STATE = {
  renown: {},
  favours: {},
};

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case MYSELF_RECEIVED:
      return { ...action.payload };
    default:
      return state;
  }
}
