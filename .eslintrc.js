module.exports = {
  "extends": "airbnb",
  "plugins": ["jest"],
  "rules": {
    "no-plusplus": ['error', { 'allowForLoopAfterthoughts': true }],
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
  },
  "env": {
    "browser": true,
    "jest/globals": true,
    "webextensions": true,
  },
};
