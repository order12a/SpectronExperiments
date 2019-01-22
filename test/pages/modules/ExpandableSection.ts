import {BaseComponent} from './BaseComponent';

export class ExpandableSection extends BaseComponent{
  public containerSelector: string;

  constructor (containerSelector = '') {
    super();
    this.containerSelector = containerSelector;
  }

  // TODO implement
}
