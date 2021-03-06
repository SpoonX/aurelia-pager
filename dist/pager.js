import {bindingMode}  from 'aurelia-binding';
import {bindable, customElement} from 'aurelia-templating';
import {resolvedView} from 'aurelia-view-manager';

@customElement('pager')
@resolvedView('aurelia-pager', 'pager')
export class Pager {
  @bindable({defaultBindingMode: bindingMode.twoWay})

  @bindable page          = 1;  // current page
  @bindable resourceCount = 0;  // amount of results found
  @bindable pagerange     = 3;  // ranges of pages to view e.g "3 4 [5] 6 7"
  @bindable limit         = 30; // the amount of records on a page
  @bindable criteria      = {}; // search criteria for DB resource
  @bindable resource;           // data resource, either a ORM or a array
  @bindable pages;              // total amount of pages
  @bindable onPageChanged;      // optional event to call when page value changes

  attached() {
    if (!this.page) {
      this.page = 1;
    }

    this.reloadCount();
  }

  reloadCount() {
    if (this.resource) {
      return this._calculatePages();
    }

    this._calculateRange();
  }

  pagesChanged() {
    this.reloadCount();
  }

  pageChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.goToPage(newValue);

      if (typeof this.onPageChanged === 'function') {
        this.onPageChanged(newValue, oldValue);
      }
    }
  }

  criteriaChanged(newValue, oldValue) {
    if (this.resource && (newValue !== oldValue)) {
      this._calculatePages();
    }
  }

  nextPage() {
    if (this.page < this.pages) {
      this.page += 1;
    }
  }

  prevPage() {
    if (this.page > 1 && this.page <= this.pages) {
      this.page -= 1;
    }
  }

  lastPage() {
    this.page = this.pages;
  }

  firstPage() {
    this.page = 1;
  }

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
      rangeEnd = Math.min((this.pagerange * 2) + 1, this.pages);
    }

    if (this.page > (this.pages - this.pagerange)) {
      if (this.pages <= (this.pagerange * 2)) {
        rangeStart = 1;
      } else {
        rangeStart = Math.max(this.pages - (this.pagerange * 2), this.pagerange);
      }
    }

    for (i = rangeStart; i < rangeEnd + 1; i += 1) {
      navs.push({
        text   : i.toString(),
        current: i === this.page,
        load   : page => {
          this.page = parseInt(page, 10);
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
      this.resourceCount = result.count;
      this.pages         = Math.ceil(result.count / this.limit) || 1;
      this.goToPage(1);
    })
    .catch(error => {
      console.error('Something went wrong.', error);
    });
  }
}
