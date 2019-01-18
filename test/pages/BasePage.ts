const AppHolder = require('../util/AppHolder');
// Chai should used as global so it's not required to import it anymore
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');

// chai.config.includeStack = false;
// chai.config.showDiff = true;
// chai.should();
// chai.use(chaiAsPromised);

export class BasePage {
  app: any;
  constructor () {
    this.app = AppHolder.getAppHolder().app;
  }
}
