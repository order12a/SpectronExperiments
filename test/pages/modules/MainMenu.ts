import {BaseComponent} from './BaseComponent';
import Client = WebdriverIO.Client;
import RawResult = WebdriverIO.RawResult;

export class MainMenu extends BaseComponent {
  public containerSelector: string;

  constructor (containerSelector = '.js-nav') {
    super();
    this.containerSelector = containerSelector;
  }

  get selectedButton (): Client<RawResult<WebdriverIO.Element>> & RawResult<WebdriverIO.Element> {
    return this.elementContainer.element('button[class="nav-button is-selected"]');
  }

  get elementContainer (): Client<RawResult<WebdriverIO.Element>> & RawResult<WebdriverIO.Element> {
    return this.app.client.element(this.containerSelector);
  }

  async selectSection (section): Promise<void> {
    await this.elementContainer.element('button[data-section="' + section + '"]').click();
  }

  async getSelectedSectionText (): Promise<string> {
    this.selectedButton.waitForVisible(5000);
    return this.selectedButton.getText();
  }
}
