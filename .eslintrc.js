module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "rules": {
      "semi": [2, "always"]
  },
  "globals": {
      "allure": true
  }
};
