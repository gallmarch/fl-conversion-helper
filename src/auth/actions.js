import { LOGGED_IN, LOGGED_OUT } from './types';

export function login() {
  return (dispatch) => {
    dispatch({ type: LOGGED_IN });
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGGED_OUT });
  }
}
