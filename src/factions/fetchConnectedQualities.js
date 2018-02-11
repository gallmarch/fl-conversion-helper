import $ from 'jquery';

export default function fetchConnectedQualities() {
  // TODO: see if the Fetch API is actually up to the task of
  // handling this when we're calling from a web extension. It
  // sort of seems like overkill to bundle JQuery just to make
  // a call like this (but axios' code contains calls to eval()
  // that cause it to fail Mozilla's validation).
  const url = '//fallenlondon.storynexus.com/Me/StatusesForCategory?category=Contacts';
  const datatype = 'html';
  return $.ajax({ url, datatype });
}
