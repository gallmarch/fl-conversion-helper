module.exports = {
  "extends": "airbnb",
  "plugins": ["jest"],
  "rules": {
    "no-console": "off",
    "react/no-danger": "off",
    "import/no-named-as-default": "off",
    "no-plusplus": ['error', { 'allowForLoopAfterthoughts': true }],
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
  },
  "env": {
    "browser": true,
    "jest/globals": true,
    "webextensions": true,
  },
  "globals": {
    "NODE_ENV": true,
  },
};
