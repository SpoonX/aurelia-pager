import {Config as ViewManagerConfig} from 'aurelia-view-manager';
import {Config} from './config';

export function configure(aurelia, configCallback) {
  aurelia.container.get(ViewManagerConfig).configureNamespace('spoonx/pager', {
    location: './view/{{framework}}/{{view}}.html'
  });

  if (typeof configCallback === 'function') {
    configCallback(aurelia.container.get(Config));
  }

  aurelia.globalResources('./component/pager', './component/resource-pager');
}
