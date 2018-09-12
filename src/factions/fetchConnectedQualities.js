import axios from 'axios';
import { log } from '../util';

import { API_URL_BASE } from '../constants';

export function fetchConnectedQualities() {
  return (dispatch) => {
    const url = `${API_URL_BASE}/api/character/myself`;
    return axios.get(url)
      .then(({ data }) => {
        const { possessions } = data;
        const social = possessions.find(el => el.name === 'Social: Contacts & Acquaintances');
        console.info(social);
      });
  }
}

export function _fetchConnectedQualities(isLegacy) {
  log(`Calling fetchConnectedQualities with isLegacy=${isLegacy}`);
  // TODO: see if the Fetch API is actually up to the task of
  // handling this when we're calling from a web extension. It
  // sort of seems like overkill to bundle JQuery just to make
  // a call like this (but axios' code contains calls to eval()
  // that cause it to fail Mozilla's validation).
  const url = getUrl(isLegacy);

  const datatype = 'html';
  const params = isLegacy
    ? { url, datatype }
    : { url, datatype, accepts: {
      json : 'application/json',
      text: 'text/plain',
    } };
  return $.ajax(params);
}

function getUrl() {
  return '//beta.fallenlondon.com/myself';
}
