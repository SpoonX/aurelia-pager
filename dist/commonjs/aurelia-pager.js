'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _pager = require('./pager');

var _aureliaViewManager = require('aurelia-view-manager');

function configure(aurelia) {
  aurelia.container.get(_aureliaViewManager.Config).configureNamespace('aurelia-pager', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./pager');
}