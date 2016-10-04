'use strict';

System.register(['./pager', 'aurelia-view-manager'], function (_export, _context) {
  "use strict";

  var Pager, Config;
  function configure(aurelia) {
    aurelia.container.get(Config).configureNamespace('aurelia-pager', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./pager');
  }

  _export('configure', configure);

  return {
    setters: [function (_pager) {
      Pager = _pager.Pager;
    }, function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }],
    execute: function () {}
  };
});