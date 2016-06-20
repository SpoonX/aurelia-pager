import {Config} from 'aurelia-view-manager';
export {Config} from './config';

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('spoonx/pager', {
    location: './view/{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./component/pager', './component/resource-pager');
}
