var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { bindable, inject, customElement } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

export let Pager = (_dec = customElement('pager'), _dec2 = inject(EventAggregator, Element), _dec(_class = _dec2(_class = (_class2 = class Pager {

  constructor(eventAggregator, element) {
    _initDefineProp(this, 'page', _descriptor, this);

    _initDefineProp(this, 'pages', _descriptor2, this);

    _initDefineProp(this, 'pagerange', _descriptor3, this);

    _initDefineProp(this, 'limit', _descriptor4, this);

    _initDefineProp(this, 'criteria', _descriptor5, this);

    _initDefineProp(this, 'repository', _descriptor6, this);

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

    this.eventAg.publish('pageChanged', { page: this.page });
  }

  _calculateRange() {
    let rangeStart = Math.max(this.page - this.pagerange, 1);
    let rangeEnd = Math.min(this.page + this.pagerange, this.pages);
    let navs = [];
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
        text: i.toString(),
        current: i === this.page,
        load: page => {
          this.goToPage(parseInt(page));
        }
      });
    }

    this.navs = navs;
  }

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
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [bindable], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'pages', [bindable], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'pagerange', [bindable], {
  enumerable: true,
  initializer: function () {
    return 3;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'limit', [bindable], {
  enumerable: true,
  initializer: function () {
    return 30;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [bindable], {
  enumerable: true,
  initializer: function () {
    return {};
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'repository', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class);