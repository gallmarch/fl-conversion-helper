import { FETCH_MYSELF_REQUESTED } from '../types';

export default function fetchMyself() {
  return () => {
    console.info('Fetching myself');
    chrome.runtime.sendMessage(
      { type: FETCH_MYSELF_REQUESTED },
    );
  };
}
