import {AppHolder} from '../util/AppHolder';
import * as chai from 'chai';
import * as chaiAsPromised from "chai-as-promised";
chai.should();
chai.use(chaiAsPromised);

export class BasePage {
  app: any;
  constructor () {
    this.app = AppHolder.getAppHolder().app;
  }
}
