import {BasePage} from './BasePage';
import {MainMenu} from './modules/MainMenu';

export class BaseNavigatablePage extends BasePage {
  public mainMenu: MainMenu;

  constructor () {
    super();
    this.mainMenu = new MainMenu('.js-nav');
  }

  // TODO implement
}
