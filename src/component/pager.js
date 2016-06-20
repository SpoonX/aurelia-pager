import {bindable, customElement, bindingMode, inject} from 'aurelia-framework';
import {resolvedView} from 'aurelia-view-manager';
import {Pager as Base} from '../pager';
import {Config} from '../config';

@customElement('pager')
@resolvedView('spoonx/pager', 'pager')
@inject(Config)
export class Pager extends Base {

  @bindable({defaultBindingMode: bindingMode.twoWay}) page = 1

  @bindable range  = 3;  // ranges of pages to view e.g "3 4 [5] 6 7"
  @bindable pages;          // total amount of pages
  @bindable data;          // total amount of pages

  constructor(config) {
    super(config);
  }

}
