'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pager = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

var _aureliaFramework = require('aurelia-framework');

var _aureliaViewManager = require('aurelia-view-manager');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Pager = exports.Pager = (_dec = (0, _aureliaFramework.customElement)('pager'), _dec2 = (0, _aureliaViewManager.resolvedView)('aurelia-pager', 'pager'), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
  function Pager() {
    _classCallCheck(this, Pager);

    _initDefineProp(this, 'page', _descriptor, this);

    _initDefineProp(this, 'pagerange', _descriptor2, this);

    _initDefineProp(this, 'limit', _descriptor3, this);

    _initDefineProp(this, 'criteria', _descriptor4, this);

    _initDefineProp(this, 'resource', _descriptor5, this);

    _initDefineProp(this, 'pages', _descriptor6, this);
  }

  Pager.prototype.attached = function attached() {
    if (!this.page) {
      this.page = 1;
    }

    this.reloadCount();
  };

  Pager.prototype.reloadCount = function reloadCount() {
    if (this.resource) {
      return this._calculatePages();
    }

    this._calculateRange();
  };

  Pager.prototype.pageChanged = function pageChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.goToPage(newValue);
    }
  };

  Pager.prototype.criteriaChanged = function criteriaChanged(newValue, oldValue) {
    if (this.resource && newValue !== oldValue) {
      this._calculatePages();
    }
  };

  Pager.prototype.nextPage = function nextPage() {
    if (this.page < this.pages) {
      this.page++;
    }
  };

  Pager.prototype.prevPage = function prevPage() {
    if (this.page > 1 && this.page <= this.pages) {
      this.page--;
    }
  };

  Pager.prototype.lastPage = function lastPage() {
    this.page = this.pages;
  };

  Pager.prototype.firstPage = function firstPage() {
    this.page = 1;
  };

  Pager.prototype.goToPage = function goToPage(page) {
    if (page < 0 || page > this.pages) {
      return;
    }

    this._calculateRange();
  };

  Pager.prototype._calculateRange = function _calculateRange() {
    var _this = this;

    var rangeStart = Math.max(this.page - this.pagerange, 1);
    var rangeEnd = Math.min(this.page + this.pagerange, this.pages);
    var navs = [];
    var i = void 0;

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
        text: i.toString(),
        current: i === this.page,
        load: function load(page) {
          _this.page = parseInt(page);
        }
      });
    }

    this.navs = navs;
  };

  Pager.prototype._calculatePages = function _calculatePages() {
    var _this2 = this;

    if (Array.isArray(this.resource)) {
      this.pages = Math.ceil(this.resource.length / this.limit) || 1;
      return this.goToPage(1);
    }

    this.resource.count(this.criteria, true).then(function (result) {
      _this2.pages = Math.ceil(result.count / _this2.limit) || 1;
      _this2.goToPage(1);
    }).catch(function (error) {
      console.error('Something went wrong.', error);
    });
  };

  return Pager;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_dec3, _aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'pagerange', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 3;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'limit', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 30;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'resource', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'pages', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class);