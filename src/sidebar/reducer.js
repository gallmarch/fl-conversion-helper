import { ATTRIBUTES_UPDATED } from './types';

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ATTRIBUTES_UPDATED:
      return { ...action.payload };
    default:
      return state;
  }
}
