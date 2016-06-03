import {bindable, customElement, bindingMode} from 'aurelia-framework';

@customElement('pager')
export class Pager {
  @bindable({defaultBindingMode: bindingMode.twoWay})

  @bindable page      = 1;  // current page
  @bindable pagerange = 3;  // ranges of pages to view e.g "3 4 [5] 6 7"
  @bindable limit     = 30; // the amount of records on a page
  @bindable criteria  = {}; // search criteria for DB resource
  @bindable resource;       // data resource, either a ORM or a array
  @bindable pages;          // total amount of pages

  /**
   * Attach to view
   */
  attached() {
    if (!this.page) {
      this.page = 1;
    }

    this.reloadCount();
  }

  /**
   * Public method to update the pager
   */
  reloadCount() {
    if (this.resource) {
      return this._calculatePages();
    }

    this._calculateRange();
  }

  /**
   * Update changed page
   *
   * @param  {integer} newValue New page value
   * @param  {integer} oldValue Old page value
   */
  pageChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.goToPage(newValue);
    }
  }

  /**
   * Update criteria
   *
   * @param  {{}} newValue New criteria
   * @param  {{}} oldValue Old criteria
   */
  criteriaChanged(newValue, oldValue) {
    if (this.resource && newValue && (newValue !== oldValue)) {
      this._calculatePages();
    }
  }

  /**
   * Go to next page
   */
  nextPage() {
    if (this.page < this.pages) {
      this.page++;
    }
  }

  /**
   * Go to previous page
   */
  prevPage() {
    if (this.page > 1 && this.page <= this.pages) {
      this.page--;
    }
  }

  /**
   * Go to last page
   */
  lastPage() {
    this.page = this.pages;
  }

  /**
   * Go to first page
   */
  firstPage() {
    this.page = 1;
  }

  /**
   * Go to a page
   */
  goToPage(page) {
    if (page < 0 || page > this.pages) {
      return;
    }

    this._calculateRange();
  }

  /**
   * caclulate the amount of pages to show
   */
  _calculateRange() {
    let rangeStart = Math.max(this.page - this.pagerange, 1);
    let rangeEnd   = Math.min(this.page + this.pagerange, this.pages);
    let navs       = [];
    let i;

    if (this.page <= this.pagerange) {
      rangeEnd = Math.min(this.pagerange * 2 + 1, this.pages);
    }

    if (this.page > this.pages - this.pagerange) {
      if (this.pages < this.pagerange) {
        rangeStart = 1;
      } else {
        rangeStart = Math.max(this.pages - this.pagerange * 2, this.pagerange);
      }
    }

    for (i = rangeStart; i < rangeEnd + 1; i++) {
      navs.push({
        text   : i.toString(),
        current: i === this.page,
        load   : page => {
          this.page = parseInt(page);
        }
      });
    }

    this.navs = navs;
  }

  /**
   * fetch data from DB or given array to calculate the amount of pages
   */
  _calculatePages() {
    if (Array.isArray(this.resource)) {
      this.pages = Math.ceil(this.resource.length / this.limit) || 1;
      return this.goToPage(1);
    }

    this.resource.count(this.criteria, true).then(result => {
      this.pages = Math.ceil(result.count / this.limit) || 1;
      this.goToPage(1);
    }).catch(error => {
      console.error('Something went wrong.', error);
    });
  }
}
