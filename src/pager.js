import {computedFrom} from 'aurelia-framework';

export class Pager {

  page  = 1
  data
  range = 3
  pages

  constructor(config) {
    console.log(config)
    this.page = this.page || 1;
    Object.assign(this, config.configurations);
  }

  dataChanged() {
    this.page = 1;
    this.pages = this.data.length;
  }

  pagesChanged() {
    this.page = 1;
  }

  addPage(page) {
    this.setPage(this.page + page);

    return this.page;
  }

  setPage(page) {
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
  get pageNumbers() {
    let numbers = [];

    for (let index = 0; index < Math.min(this.pages, this.range * 2 + 1); index++) {
      numbers[index] = number.call(this, index);
    }

    return numbers;

    function number(index) {
      if (this.pages < this.range * 2 + 1) {
        return index + 1;
      }

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
