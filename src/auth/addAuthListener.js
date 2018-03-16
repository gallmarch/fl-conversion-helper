import axios from 'axios';
import { login, logout } from './actions';

export default function addAuthListener({ store }) {
  // Set a listener on localStorage
  window.setInterval(checkLocalStorage, 100);

  function checkLocalStorage() {
    // Check for an access token
    const { access_token } = window.localStorage;

    // If we have one, set the Authorization header
    if (access_token) {
      setAuthHeader({ access_token });
      return login()(store.dispatch);
    }

    // Otherwise, ensure that the Authorization header is unset
    unsetAuthHeader();
    return logout()(store.dispatch);
  }
}

function unsetAuthHeader() {
  delete axios.defaults.headers.common.Authorization;
}

function setAuthHeader({ access_token }) {
  axios.defaults.headers.common.Authorization = `Bearer ${access_token.replace('"', '')}`;
}
