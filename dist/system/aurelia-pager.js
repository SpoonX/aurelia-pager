'use strict';

System.register(['aurelia-view-manager'], function (_export, _context) {
  "use strict";

  var Config;
  function configure(aurelia) {
    aurelia.container.get(Config).configureNamespace('aurelia-pager', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./pager');
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }],
    execute: function () {}
  };
});