var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

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

import { bindingMode } from 'aurelia-binding';
import { bindable, customElement } from 'aurelia-templating';
import { resolvedView } from 'aurelia-view-manager';

export let Pager = (_dec = customElement('pager'), _dec2 = resolvedView('aurelia-pager', 'pager'), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = class Pager {
  constructor() {
    _initDefineProp(this, 'page', _descriptor, this);

    _initDefineProp(this, 'pagerange', _descriptor2, this);

    _initDefineProp(this, 'limit', _descriptor3, this);

    _initDefineProp(this, 'criteria', _descriptor4, this);

    _initDefineProp(this, 'resource', _descriptor5, this);

    _initDefineProp(this, 'pages', _descriptor6, this);
  }

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

  pageChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.goToPage(newValue);
    }
  }

  criteriaChanged(newValue, oldValue) {
    if (this.resource && newValue !== oldValue) {
      this._calculatePages();
    }
  }

  nextPage() {
    if (this.page < this.pages) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1 && this.page <= this.pages) {
      this.page--;
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

  _calculateRange() {
    let rangeStart = Math.max(this.page - this.pagerange, 1);
    let rangeEnd = Math.min(this.page + this.pagerange, this.pages);
    let navs = [];
    let i;

    if (this.page <= this.pagerange) {
      rangeEnd = Math.min(this.pagerange * 2 + 1, this.pages);
    }

    if (this.page > this.pages - this.pagerange) {
      if (this.pages <= this.pagerange * 2) {
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
          this.page = parseInt(page);
        }
      });
    }

    this.navs = navs;
  }

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
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_dec3, bindable], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'pagerange', [bindable], {
  enumerable: true,
  initializer: function () {
    return 3;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'limit', [bindable], {
  enumerable: true,
  initializer: function () {
    return 30;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [bindable], {
  enumerable: true,
  initializer: function () {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'resource', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'pages', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class);