console.info('back once again with the renegade injecta');
if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  console.info('react devtools global hooks goes in');
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {};
}
function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
injectScript(chrome.extension.getURL('content.js'), 'body');
