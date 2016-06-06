define(['exports', 'aurelia-framework', 'aurelia-view-manager'], function (exports, _aureliaFramework, _aureliaViewManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Config = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Config = exports.Config = (_dec = (0, _aureliaFramework.inject)(_aureliaViewManager.Config), _dec(_class = function Config(viewManagerConfig) {
    _classCallCheck(this, Config);

    viewManagerConfig.configureNamespace('aurelia-pager', {
      framework: 'bootstrap',
      location: './{{framework}}/{{view}}.html'
    });
  }) || _class);
});