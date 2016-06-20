import {Config as ViewManagerConfig} from 'aurelia-view-manager';
export {Config} from './config';

export function configure(aurelia, configCallback) {
  aurelia.container.get(ViewManagerConfig).configureNamespace('spoonx/pager', {
    location: './view/{{framework}}/{{view}}.html'
  });

  configCallback && configCallback(aurelia.container.get(Config));

  aurelia.globalResources('./component/pager', './component/resource-pager');
}
