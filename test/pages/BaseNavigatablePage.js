const BasePage = require('./BasePage');
const MainMenu = require('./modules/MainMenu');

class BaseNavigatablePage extends BasePage {
  constructor () {
    super();
    this.mainMenu = new MainMenu('.js-nav');
  }

  // TODO implement
}

module.exports = BaseNavigatablePage;
