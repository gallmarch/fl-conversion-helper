/* eslint-disable camelcase */
import axios from 'axios';
import makeCheckLocalStorage from './makeCheckLocalStorage';

const CHECK_LOCAL_STORAGE_INTERVAL = 100;

export default function addAuthListener({ store }) {
  // Set a listener on localStorage
  const checkLocalStorage = makeCheckLocalStorage({ axios, store });
  window.setInterval(checkLocalStorage, CHECK_LOCAL_STORAGE_INTERVAL);
}
