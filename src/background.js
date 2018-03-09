console.info('I am the background script');
console.info(chrome.webRequest);

const filters = { urls: [
  'https://api.fallenlondon.com/api/character/possessions',
] };

chrome.webRequest.onCompleted.addListener(
  callback,
  filters,
);

function callback({ method }) {
  if (method !== 'GET') {
    console.info(`Method: ${method}, blurgh`);
    return;
  }
  console.info(`Method GET!!!`);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { page: 'possessions' }, () => {});
  });
}
