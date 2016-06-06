'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _config = require('./config');

function configure(aurelia, cb) {
  cb = typeof cb === 'function' ? cb : function () {};

  aurelia.globalResources('./pager');

  cb(aurelia.container.get(_config.Config));
}