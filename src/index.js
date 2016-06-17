import {Config} from 'aurelia-view-manager';

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('spoonx/pager', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./pager');
}
