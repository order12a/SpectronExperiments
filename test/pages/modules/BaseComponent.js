const AppHolder = require('../../util/AppHolder');

class BaseComponent {
  constructor () {
    this.app = AppHolder.getAppHolder().app;
  }
}

module.exports = BaseComponent;
