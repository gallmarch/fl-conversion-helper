/* eslint-disable no-param-reassign, camelcase */

import { AUTHORIZATION_HEADER_CHANGED } from './types';

let authorizationHeader;

export default function setAuthHeader({ access_token, axios }) {
  const header = `Bearer ${access_token.replace(/"/g, '')}`;
  axios.defaults.headers.common.Authorization = header;
  if (header !== authorizationHeader) {
    console.info('Setting authorization header.');
    chrome.runtime.sendMessage({ type: AUTHORIZATION_HEADER_CHANGED, payload: header });
    authorizationHeader = header;
  }
}
