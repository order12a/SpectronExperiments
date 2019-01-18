const AppHolder = require('../../util/AppHolder');

export class BaseComponent {
  public app: any;

  constructor () {
    this.app = AppHolder.getAppHolder().app;
  }
}
