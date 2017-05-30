define(['exports', 'aurelia-view-manager', './pager'], function (exports, _aureliaViewManager, _pager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.container.get(_aureliaViewManager.Config).configureNamespace('aurelia-pager', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./pager');
  }
});