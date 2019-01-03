const BasePage = require('./BasePage');
const navMenuSelector = '.js-nav';
const aboutModalSelector = '#about-modal';

class AboutPage extends BasePage {
  get aboutModal () {
    return this.app.client.element(aboutModalSelector);
  }

  async checkAboutModalIsVisible () {
    await this.isAboutModalVisible().should.eventually.be.true;
  }

  async checkAboutModalIsNotVisible (someArg, someArg2) {
    // console.log(someArg); // Just for testing purposes
    // console.log(someArg2); // Just for testing purposes
    await this.isAboutModalVisible().should.eventually.be.false;
  }

  async isAboutModalVisible () {
    return this.app.client.isVisible(aboutModalSelector);
  }

  async getAboutModalText () {
    return this.aboutModal.getText();
  }

  async getNavMenu () {
    return this.app.client.element(navMenuSelector);
  }

  async checkNavIsVisible () {
    await this.isNavVisible().should.eventually.be.true;
  }

  async checkNavIsNotVisible () {
    await this.isNavVisible().should.eventually.be.false;
  }

  async isNavVisible () {
    return this.app.client.isVisible(navMenuSelector);
  }

  async dismissAboutPage () {
    if (await this.app.client.isVisible('button[id="get-started"]')) {
      await this.app.client.click('button[id="get-started"]');
      this.app.client.pause(500);
    }
  }
}

module.exports = AboutPage;
