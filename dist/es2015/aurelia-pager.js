import { Config } from 'aurelia-view-manager';

import { Pager } from './pager';

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('aurelia-pager', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./pager');
}