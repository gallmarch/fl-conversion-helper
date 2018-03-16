import axios from 'axios';
import { login, logout } from './actions';

export default function addAuthListener({ store }) {
  const hasToken = () => Object.keys(window.localStorage).includes('access_token');
  let authenticated = hasToken();

  const setAuthHeader = ({ access_token }) => {
    axios.defaults.headers.common.Authorization = `Bearer ${access_token.replace('"', '')}`;
  }

  const unsetAuthHeader = () => {
    delete axios.defaults.headers.common.Authorization;
  }

  // Set a listener on localStorage
  window.setInterval(checkLocalStorage, 100);
  function checkLocalStorage() {
    const { access_token } = window.localStorage;
    if (access_token) {
      setAuthHeader({ access_token });
      return login()(store.dispatch);
    }
    unsetAuthHeader();
    return logout()(store.dispatch);
  }
}
