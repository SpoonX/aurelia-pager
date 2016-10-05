import {Pager} from './pager';
import {Config} from 'aurelia-view-manager';

// added for bundling
// eslint-disable-line no-unused-vars

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('aurelia-pager', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./pager');
}
