const BaseComponent = require('./BaseComponent');

class MainMenu extends BaseComponent {
  constructor (containerSelector = '.js-nav') {
    super();
    this.containerSelector = containerSelector;
  }

  get selectedButton () {
    return this.elementContainer.element('button[class="nav-button is-selected"]');
  }

  get elementContainer () {
    return this.app.client.element(this.containerSelector);
  }

  async selectSection (section) {
    await this.elementContainer.element('button[data-section="' + section + '"]').click();
  }

  async getSelectedSectionText () {
    this.selectedButton.waitForVisible(5000);
    return this.selectedButton.getText();
  }
}

module.exports = MainMenu;
