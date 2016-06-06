import {inject} from 'aurelia-framework';
import {Config as ViewManagerConfig} from 'aurelia-view-manager';

@inject(ViewManagerConfig)
export class Config {
  constructor(viewManagerConfig) {
    viewManagerConfig.configureNamespace('aurelia-pager', {
      framework: 'bootstrap',
      location : './{{framework}}/{{view}}.html'
    });
  }
}
