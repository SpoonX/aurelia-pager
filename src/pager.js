import {bindable, inject, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('pager')
@inject(EventAggregator, Element)
export class Pager {

  @bindable page       = 1;  // current page
  @bindable pages      = 1;  // total amount of pages
  @bindable pagerange  = 3;  // ranges of pages to view e.g "3 4 [5] 6 7"
  @bindable limit      = 30; // the amount of records on a page
  @bindable criteria   = {}; // search criteria for repository
  @bindable repository = null;

  constructor(eventAggregator, element) {
    this.element = element;
    this.eventAg = eventAggregator;
  }

  attached() {
    if (!this.repository) {
      return this.goToPage(this.page);
    }

    this._subscribeEvents();
    this._calculatePages();
  }

  set page(page) {
    this.goToPage(page);
  }

  set pages(pages) {
    this.pages = pages;
  }

  set range(range) {
    this.pagerange = range;
  }

  set criteria(crit) {
    this.criteria = crit;
  }

  get page() {
    return this.page;
  }

  get pages() {
    return this.pages;
  }

  get range() {
    return this.pagerange;
  }

  get criteria() {
    return this.criteria;
  }

  nextPage() {
    if (this.page < this.pages) {
      this.goToPage(++this.page);
    }
  }

  prevPage() {
    if (this.page > 1 && this.page <= this.pages) {
      this.goToPage(--this.page);
    }
  }

  goToPage(page) {
    if (page < 0 || page > this.pages) {
      return;
    }

    this.page = page;

    this._calculateRange();

    // notify that the page has changed
    this.eventAg.publish('pageChanged', {page: this.page});
  }

  // caclulate the amount of pages to show
  _calculateRange() {
    let rangeStart = Math.max(this.page - this.pagerange, 1);
    let rangeEnd   = Math.min(this.page + this.pagerange, this.pages);
    let navs       = [];
    let i;

    if (this.page <= this.pagerange) {
      rangeEnd = Math.min(this.pagerange * 2 + 1, this.pages);
    }

    if (this.page < this.pages - this.pagerange) {
      if (this.pages > this.pagerange) {
        rangeStart = 1;
      } else {
        rangeStart = Math.max(this.pages - this.pagerange * 2, this.pagerange);
      }
    }

    for (i = rangeStart; i < rangeEnd + 1; i++) {
      navs.push({
        text   : (i).toString(),
        current: i === this.page,
        load   : (page) => {
          this.goToPage(parseInt(page));
        }
      });
    }

    this.navs = navs;
  }

  // fetch data from DB to calculate the amount of pages
  _calculatePages() {
    this.repository.count(this.criteria, true).then(result => {
      this.pages = Math.ceil(result.count / this.limit);

      if (this.pages < 1) {
        this.pages = 1;
      }

      return this.goToPage(this.page);
    }).catch(error => {
      console.error('Something went wrong.', error);
    });
  }

  // subscribe to events
  _subscribeEvents() {
    this.eventAg.subscribe('updateCriteria', response => {
      this.criteria = response;

      this.goToPage(1);
      this._calculatePages();
    });

    this.eventAg.subscribe('changePage', response => {
      this.goToPage(response.page);
    });
  }
}
