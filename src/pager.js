import {bindable, customElement, bindingMode, computedFrom} from 'aurelia-framework';
import {resolvedView} from 'aurelia-view-manager';

@resolvedView('spoonx/pager', 'pager')
@customElement('pager')
export class Pager {

  @bindable({defaultBindingMode: bindingMode.twoWay}) page

  @bindable data    //set the data if you want to alter the
  @bindable range
  @bindable limit
  @bindable pages

  constructor() {
    this.page = this.page || 1;
  }

  dataChanged() {
    this.page = 1;
    this.pages = this.data.length;
  }

  pagesChanged() {
    this.page = 1;
  }

  next() {
    return this.change(this.page + 1);
  }

  prev() {
    return this.change(this.page - 1);
  }

  change(page) {
    if (this.page < 0) {
      this.page = 0;
      return this.page;
    }

    if (this.page > this.pages) {
      this.page = this.pages;
      return this.page;
    }

    this.page = page;

    return this.page;
  }

  @computedFrom('page', 'pages', 'range')
  get numbers() {
    let numbers = [];

    for (let index = 0; index < this.range * 2 + 1; index++) {
      numbers[index] = number.call(this, index);
    }

    return numbers;

    function number(index) {
      if (this.page + this.range > this.pages) {
        return this.pages - (this.range * 2) + index;
      }

      if (this.page - this.range < 1) {
        return index + 1;
      }

      return this.page - this.range + index;
    }
  }

}
