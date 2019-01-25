module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": ["jest"],
  "rules": {
    "no-console": "off",
    "react/no-danger": "off",
    "import/no-named-as-default": "off",
    "import/no-extraneous-dependencies": ['error', { 'devDependencies': true }],
    "no-plusplus": ['error', { 'allowForLoopAfterthoughts': true }],
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
  },
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true,
    "webextensions": true,
  },
  "globals": {
    "NODE_ENV": true,
  },
};
