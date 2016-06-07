'use strict';

System.register(['aurelia-framework', 'aurelia-view-manager'], function (_export, _context) {
  "use strict";

  var inject, ViewManagerConfig, _dec, _class, Config;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaViewManager) {
      ViewManagerConfig = _aureliaViewManager.Config;
    }],
    execute: function () {
      _export('Config', Config = (_dec = inject(ViewManagerConfig), _dec(_class = function Config(viewManagerConfig) {
        _classCallCheck(this, Config);

        viewManagerConfig.configureNamespace('aurelia-pager', {
          framework: 'bootstrap',
          location: './{{framework}}/{{view}}.html'
        });
      }) || _class));

      _export('Config', Config);
    }
  };
});