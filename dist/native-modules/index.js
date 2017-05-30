'use strict';

exports.__esModule = true;

var _aureliaPager = require('./aurelia-pager');

Object.keys(_aureliaPager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaPager[key];
    }
  });
});