import axios from 'axios';
import { API_URL_BASE } from './constants';
import { FETCH_MYSELF_REQUESTED, MYSELF_RECEIVED } from './myself/types';
import renownIDs from './factions/renown';
import favourIDs from './factions/favours';
import { POSSESSIONS_FETCHED } from './possessions/types';
import { AUTHORIZATION_HEADER_CHANGED } from './auth/types';

console.info('I am the background script');
console.info(chrome.webRequest);

let authorizationHeader;

chrome.runtime.onMessage.addListener((message, sender) => {
  switch (message.type) {
    case AUTHORIZATION_HEADER_CHANGED:
      return setAuthorizationHeader(message.payload);
    case FETCH_MYSELF_REQUESTED:
      return fetchMyself(sender);
    default:
      return undefined;
  }
});

function fetchMyself(sender) {
  const dispatch = makeDispatch(sender);
  console.info('Fetching myself!');
  const url = `${API_URL_BASE}/api/character/myself`;
  return axios.get(url, { headers: { Authorization: authorizationHeader } })
    .then(({ data }) => {
      // Destructure the incoming JSON
      const social = data.possessions.find(el => el.name === 'Contacts').possessions;

      // Build the Renown and Favours object
      const payload = { renown: reduce(renownIDs), favours: reduce(favourIDs) };

      // Dispatch the action
      dispatch({ type: MYSELF_RECEIVED, payload });

      // Dispatch the possessions action
      dispatch({
        type: POSSESSIONS_FETCHED,
        payload: data.possessions.reduce((acc, el) => [...acc, ...el.possessions], []),
      });

      function reduce(obj) {
        return Object.keys(obj).reduce((acc, k) => {
          const match = social.find(el => el.id === Number(obj[k]));
          return {
            ...acc,
            [k]: match ? match.level : 0,
          };
        }, {});
      }
    });
}

function makeDispatch(sender) {
  return (any) => {
    chrome.tabs.sendMessage(
      sender.tab.id,
      any,
    );
  };
}

function setAuthorizationHeader(header) {
  console.info(`Received auth header: ${header}`);
  authorizationHeader = header;
}
