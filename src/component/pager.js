import {bindable, customElement, bindingMode} from 'aurelia-framework';
import {resolvedView} from 'aurelia-view-manager';
import {Pager as Base} from '../pager';

@customElement('pager')
@resolvedView('spoonx/pager', 'pager')
export class Pager extends Base {

  @bindable({defaultBindingMode: bindingMode.twoWay}) page = 1

  @bindable range  = 3;  // ranges of pages to view e.g "3 4 [5] 6 7"
  @bindable pages;          // total amount of pages
  @bindable data;          // total amount of pages

}
