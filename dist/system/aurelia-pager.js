'use strict';

System.register(['aurelia-view-manager', './pager'], function (_export, _context) {
  "use strict";

  var Config, Pager;
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
    }, function (_pager) {
      Pager = _pager.Pager;
    }],
    execute: function () {}
  };
});