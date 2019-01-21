import {BaseComponent} from './BaseComponent';

class ExpandableSection extends BaseComponent{
  public containerSelector: string;

  constructor (containerSelector = '') {
    super();
    this.containerSelector = containerSelector;
  }

  // TODO implement
}

module.exports = ExpandableSection;
