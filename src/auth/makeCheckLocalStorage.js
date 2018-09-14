/* eslint-disable camelcase */

import setAuthHeader from './setAuthHeader';
import unsetAuthHeader from './unsetAuthHeader';
import { login, logout } from './actions';

export default function makeCheckLocalStorage({ axios, store }) {
  return function checkLocalStorage() {
    // Check for an access token
    // const { access_token } = window.localStorage;
    const access_token = window.localStorage.access_token || window.sessionStorage.access_token;

    // If we have one, set the Authorization header
    if (access_token) {
      setAuthHeader({ access_token, axios });
      return login()(store.dispatch);
    }

    // Otherwise, ensure that the Authorization header is unset
    unsetAuthHeader();
    return logout()(store.dispatch);
  };
}
