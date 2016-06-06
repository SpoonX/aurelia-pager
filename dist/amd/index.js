define(['exports', './config'], function (exports, _config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia, cb) {
    cb = typeof cb === 'function' ? cb : function () {};

    aurelia.globalResources('./pager');

    cb(aurelia.container.get(_config.Config));
  }
});