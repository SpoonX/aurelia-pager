'use strict';

System.register(['./config'], function (_export, _context) {
  "use strict";

  var Config;
  return {
    setters: [function (_config) {
      Config = _config.Config;
    }],
    execute: function () {
      function configure(aurelia, cb) {
        cb = typeof cb === 'function' ? cb : function () {};

        aurelia.globalResources('./pager');

        cb(aurelia.container.get(Config));
      }

      _export('configure', configure);
    }
  };
});