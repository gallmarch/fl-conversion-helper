export default function listenForBackgroundMessages({ store }) {
  chrome.runtime.onMessage.addListener((message) => {
    store.dispatch(message);
  });
}
