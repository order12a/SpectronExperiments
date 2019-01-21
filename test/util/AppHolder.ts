let instance: AppHolder;

export class AppHolder {
  public app: any;

  constructor (app) {
    this.app = app;
  }

  static createAppHolder (app): void {
    if (app === null || app === undefined) {
      throw Error('The electron app param could be null or undefined!');
    }

    instance = new AppHolder(app);
  }

  static getAppHolder (): AppHolder {
    if (instance) {
      return instance;
    }
    throw Error('We should invoke createAppHolder() function at least one time!');
  }
}
