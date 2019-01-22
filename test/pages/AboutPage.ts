import { BasePage } from './BasePage';
import log from '../util/LoggerDecorator';
import Client = WebdriverIO.Client;
import RawResult = WebdriverIO.RawResult;

export class AboutPage extends BasePage {
  private navMenuSelector: string = '.js-nav';
  private aboutModalSelector: string = '#about-modal';

  get aboutModal (): Client<RawResult<WebdriverIO.Element>> & RawResult<WebdriverIO.Element> {
    return this.app.client.element(this.aboutModalSelector);
  }

  @log
  async checkAboutModalIsVisible (): Promise<void> {
    await this.isAboutModalVisible().should.eventually.be.true;
  }

  @log
  async checkAboutModalIsNotVisible (someArg, someArg2): Promise<void>{
    // console.log(someArg); // Just for testing purposes
    // console.log(someArg2); // Just for testing purposes
    await this.isAboutModalVisible().should.eventually.be.false;
  }

  @log
  public async isAboutModalVisible (): Promise<boolean> {
    return await this.app.client.isVisible(this.aboutModalSelector);
  }

  @log
  public async getAboutModalText (): Promise<string> {
    return await this.aboutModal.getText();
  }

  @log
  public async getNavMenu (): Promise<WebdriverIO.Element> {
    return await this.app.client.element(this.navMenuSelector);
  }

  @log
  public async checkNavIsVisible (): Promise<void> {
    await this.isNavVisible().should.eventually.be.true;
  }

  @log
  public async checkNavIsNotVisible (): Promise<void> {
    await this.isNavVisible().should.eventually.be.false;
  }

  public async isNavVisible (): Promise<boolean> {
    return this.app.client.isVisible(this.navMenuSelector);
  }

  @log
  public async dismissAboutPage (): Promise<void> {
    if (await this.app.client.isVisible('button[id="get-started"]')) {
      await this.app.client.click('button[id="get-started"]');
      this.app.client.pause(500);
    }
  }
}
