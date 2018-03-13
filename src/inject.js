//import reactDevTools from 'react-devtools-core/standalone';
// import installGlobalHook from 'react-devtools/backend/installGlobalHook';

console.info('inject.js is running');

const installGlobalHook = require('react-devtools/backend/installGlobalHook');
installGlobalHook(window);
