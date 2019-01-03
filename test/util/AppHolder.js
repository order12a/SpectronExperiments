let instance;

class AppHolder {
  constructor (app) {
    this.app = app;
  }

  static createAppHolder (app) {
    if (app === null || app === undefined) {
      throw Error('The electron app param could be null or undefined!');
    }

    instance = new AppHolder(app);
  }

  static getAppHolder () {
    if (instance) {
      return instance;
    }
    throw Error('We should invoke createAppHolder() function at least one time!');
  }
}

module.exports = AppHolder;
