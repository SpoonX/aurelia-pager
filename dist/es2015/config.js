var _dec, _class;

import { inject } from 'aurelia-framework';
import { Config as ViewManagerConfig } from 'aurelia-view-manager';

export let Config = (_dec = inject(ViewManagerConfig), _dec(_class = class Config {
  constructor(viewManagerConfig) {
    viewManagerConfig.configureNamespace('aurelia-pager', {
      framework: 'bootstrap',
      location: './{{framework}}/{{view}}.html'
    });
  }
}) || _class);