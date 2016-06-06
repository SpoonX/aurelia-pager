'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _aureliaViewManager = require('aurelia-view-manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = exports.Config = (_dec = (0, _aureliaFramework.inject)(_aureliaViewManager.Config), _dec(_class = function Config(viewManagerConfig) {
  _classCallCheck(this, Config);

  viewManagerConfig.configureNamespace('aurelia-pager', {
    framework: 'bootstrap',
    location: './{{framework}}/{{view}}.html'
  });
}) || _class);