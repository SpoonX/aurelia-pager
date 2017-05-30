'use strict';

exports.__esModule = true;
exports.configure = configure;

var _aureliaViewManager = require('aurelia-view-manager');

var _pager = require('./pager');

function configure(aurelia) {
  aurelia.container.get(_aureliaViewManager.Config).configureNamespace('aurelia-pager', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./pager');
}