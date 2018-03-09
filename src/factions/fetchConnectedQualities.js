import $ from 'jquery';
import { log } from '../util';

export default function fetchConnectedQualities(isLegacy) {
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

function getUrl(isLegacy) {
  if (isLegacy) {
    return '//fallenlondon.storynexus.com/Me/StatusesForCategory?category=Contacts';
  }
  return '//beta.fallenlondon.com/myself';
}
