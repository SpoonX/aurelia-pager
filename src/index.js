import {Config} from 'aurelia-view-manager';

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('aurelia-pager', {
    framework: 'bootstrap',
    location : './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./pager');
}
