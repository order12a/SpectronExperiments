import { BasePage } from "./BasePage";
import Client = WebdriverIO.Client;
import RawResult = WebdriverIO.RawResult;
const navMenuSelector: string = '.js-nav';
const aboutModalSelector: string = '#about-modal';

export class AboutPage extends BasePage {
  get aboutModal (): Client<RawResult<WebdriverIO.Element>> & RawResult<WebdriverIO.Element> {
    return this.app.client.element(aboutModalSelector);
  }

  async checkAboutModalIsVisible (): Promise<void> {
    await this.isAboutModalVisible().should.eventually.be.true;
  }

  async checkAboutModalIsNotVisible (someArg, someArg2): Promise<void>{
    // console.log(someArg); // Just for testing purposes
    // console.log(someArg2); // Just for testing purposes
    await this.isAboutModalVisible().should.eventually.be.false;
  }

  async isAboutModalVisible (): Promise<boolean> {
    return this.app.client.isVisible(aboutModalSelector);
  }

  async getAboutModalText (): Promise<string> {
    return this.aboutModal.getText();
  }

  async getNavMenu (): Promise<WebdriverIO.Element> {
    return this.app.client.element(navMenuSelector);
  }

  async checkNavIsVisible (): Promise<void> {
    await this.isNavVisible().should.eventually.be.true;
  }

  async checkNavIsNotVisible (): Promise<void> {
    await this.isNavVisible().should.eventually.be.false;
  }

  async isNavVisible (): Promise<boolean> {
    return this.app.client.isVisible(navMenuSelector);
  }

  async dismissAboutPage (): Promise<void> {
    if (await this.app.client.isVisible('button[id="get-started"]')) {
      await this.app.client.click('button[id="get-started"]');
      this.app.client.pause(500);
    }
  }
}
