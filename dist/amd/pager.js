define(['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Pager = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

  var Pager = exports.Pager = (_dec = (0, _aureliaFramework.customElement)('pager'), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, Element), _dec(_class = _dec2(_class = (_class2 = function () {
    function Pager(eventAggregator, element) {
      _classCallCheck(this, Pager);

      _initDefineProp(this, 'page', _descriptor, this);

      _initDefineProp(this, 'pages', _descriptor2, this);

      _initDefineProp(this, 'pagerange', _descriptor3, this);

      _initDefineProp(this, 'limit', _descriptor4, this);

      _initDefineProp(this, 'criteria', _descriptor5, this);

      _initDefineProp(this, 'repository', _descriptor6, this);

      this.element = element;
      this.eventAg = eventAggregator;
    }

    Pager.prototype.attached = function attached() {
      if (!this.repository) {
        return this.goToPage(this.page);
      }

      this._subscribeEvents();
      this._calculatePages();
    };

    Pager.prototype.nextPage = function nextPage() {
      if (this.page < this.pages) {
        this.goToPage(++this.page);
      }
    };

    Pager.prototype.prevPage = function prevPage() {
      if (this.page > 1 && this.page <= this.pages) {
        this.goToPage(--this.page);
      }
    };

    Pager.prototype.goToPage = function goToPage(page) {
      if (page < 0 || page > this.pages) {
        return;
      }

      this.page = page;

      this._calculateRange();

      this.eventAg.publish('pageChanged', { page: this.page });
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
          load: function load(page) {
            _this.goToPage(parseInt(page));
          }
        });
      }

      this.navs = navs;
    };

    Pager.prototype._calculatePages = function _calculatePages() {
      var _this2 = this;

      this.repository.count(this.criteria, true).then(function (result) {
        _this2.pages = Math.ceil(result.count / _this2.limit);

        if (_this2.pages < 1) {
          _this2.pages = 1;
        }

        return _this2.goToPage(_this2.page);
      }).catch(function (error) {
        console.error('Something went wrong.', error);
      });
    };

    Pager.prototype._subscribeEvents = function _subscribeEvents() {
      var _this3 = this;

      this.eventAg.subscribe('updateCriteria', function (response) {
        _this3.criteria = response;

        _this3.goToPage(1);
        _this3._calculatePages();
      });

      this.eventAg.subscribe('changePage', function (response) {
        _this3.goToPage(response.page);
      });
    };

    _createClass(Pager, [{
      key: 'page',
      set: function set(page) {
        this.goToPage(page);
      },
      get: function get() {
        return this.page;
      }
    }, {
      key: 'pages',
      set: function set(pages) {
        this.pages = pages;
      },
      get: function get() {
        return this.pages;
      }
    }, {
      key: 'range',
      set: function set(range) {
        this.pagerange = range;
      },
      get: function get() {
        return this.pagerange;
      }
    }, {
      key: 'criteria',
      set: function set(crit) {
        this.criteria = crit;
      },
      get: function get() {
        return this.criteria;
      }
    }]);

    return Pager;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'page', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 1;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'pages', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 1;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'pagerange', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 3;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'limit', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 30;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return {};
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'repository', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  })), _class2)) || _class) || _class);
});