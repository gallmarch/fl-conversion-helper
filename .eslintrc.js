module.exports = {
  "extends": "airbnb",
  "rules": {
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
  },
  "env": {
    "browser": true,
    "webextensions": true,
  },
};
