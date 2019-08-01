import { FETCH_MYSELF_REQUESTED } from '../types';

export default function fetchMyself() {
  return () => {
    chrome.runtime.sendMessage(
      { type: FETCH_MYSELF_REQUESTED },
    );
  };
}
